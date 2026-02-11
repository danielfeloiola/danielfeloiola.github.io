/* ================================================
   Hero Network Graph — JS
   Gephi-style force-directed graph with communities
   ================================================ */

(function () {
    const container = document.getElementById('hero-container');
    const canvas = document.getElementById('hero-canvas');
    const ctx = canvas.getContext('2d');
    let mouse = { x: null, y: null };
    let animFrameId = null;

    // --- Mouse tracking ---
    container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // --- Canvas sizing ---
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    });

    // ========================================================
    // 1. Gerar grafo com comunidades
    // ========================================================
    const w = canvas.width;
    const h = canvas.height;
    const communityCount = 6;
    const nodesPerCommunity = [20, 18, 16, 17, 18, 16];
    const nodes = [];
    const edges = [];
    let nodeId = 0;

    // Centro do grafo deslocado pro canto superior-direito
    const graphCenterX = w * 0.7;
    const graphCenterY = h * 0.35;

    // Posições iniciais das comunidades em círculo
    const centers = [];
    for (let c = 0; c < communityCount; c++) {
        const angle = (c / communityCount) * Math.PI * 2 - Math.PI / 2;
        const radius = Math.min(w, h) * 0.45;
        centers.push({
            x: graphCenterX + Math.cos(angle) * radius,
            y: graphCenterY + Math.sin(angle) * radius,
        });
    }

    // Criar nós por comunidade
    for (let c = 0; c < communityCount; c++) {
        const count = nodesPerCommunity[c];
        const communityNodes = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 90 + 20;
            const node = {
                id: nodeId++,
                community: c,
                x: centers[c].x + Math.cos(angle) * dist,
                y: centers[c].y + Math.sin(angle) * dist,
                vx: 0,
                vy: 0,
                size: 0,
                degree: 0,
            };
            nodes.push(node);
            communityNodes.push(node);
        }

        // Edges intra-comunidade (~32% das conexões possíveis)
        for (let i = 0; i < communityNodes.length; i++) {
            for (let j = i + 1; j < communityNodes.length; j++) {
                if (Math.random() < 0.32) {
                    edges.push({ source: communityNodes[i].id, target: communityNodes[j].id });
                    communityNodes[i].degree++;
                    communityNodes[j].degree++;
                }
            }
        }
    }

    // Edges inter-comunidade (~1.2% — esparso)
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[i].community !== nodes[j].community && Math.random() < 0.012) {
                edges.push({ source: nodes[i].id, target: nodes[j].id });
                nodes[i].degree++;
                nodes[j].degree++;
            }
        }
    }

    // Tamanho e opacidade baseados no grau
    const maxDegree = Math.max(...nodes.map(n => n.degree), 1);
    nodes.forEach(n => {
        n.size = 1.5 + (n.degree / maxDegree) * 4.5;
        n.opacity = 0.3 + (n.degree / maxDegree) * 0.5;
    });

    // ========================================================
    // 2. Force-directed layout (pré-computado, ~ForceAtlas2)
    // ========================================================
    const repulsion = 900;
    const attraction = 0.005;
    const centerGravity = 0.0008;
    const iterations = 600;

    for (let iter = 0; iter < iterations; iter++) {
        const temp = Math.max(0.01, 1 - iter / iterations);

        // Repulsão nó-nó (proporcional ao grau)
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
                const force = repulsion * (1 + nodes[i].degree) * (1 + nodes[j].degree) / (dist * dist);
                const fx = (dx / dist) * force * temp;
                const fy = (dy / dist) * force * temp;
                nodes[i].vx += fx;
                nodes[i].vy += fy;
                nodes[j].vx -= fx;
                nodes[j].vy -= fy;
            }
        }

        // Atração pelas edges
        edges.forEach(e => {
            const a = nodes[e.source], b = nodes[e.target];
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
            const force = dist * attraction * temp;
            a.vx += (dx / dist) * force;
            a.vy += (dy / dist) * force;
            b.vx -= (dx / dist) * force;
            b.vy -= (dy / dist) * force;
        });

        // Gravidade pro centro do grafo
        nodes.forEach(n => {
            n.vx += (graphCenterX - n.x) * centerGravity * temp;
            n.vy += (graphCenterY - n.y) * centerGravity * temp;
            n.vx *= 0.85;
            n.vy *= 0.85;
            n.x += n.vx;
            n.y += n.vy;
        });
    }

    // ========================================================
    // 3. Escalar com zoom (grafo sangra fora da viewport)
    // ========================================================
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
        if (n.x < minX) minX = n.x;
        if (n.x > maxX) maxX = n.x;
        if (n.y < minY) minY = n.y;
        if (n.y > maxY) maxY = n.y;
    });

    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    const zoomFactor = 1.4;
    const scale = Math.max(w / rangeX, h / rangeY) * zoomFactor;
    const graphCX = (minX + maxX) / 2;
    const graphCY = (minY + maxY) / 2;

    // Centro visual deslocado pro canto superior-direito
    const viewCX = w * 0.6;
    const viewCY = h * 0.4;

    nodes.forEach(n => {
        n.x = viewCX + (n.x - graphCX) * scale;
        n.y = viewCY + (n.y - graphCY) * scale;
        n.baseX = n.x;
        n.baseY = n.y;
        n.phase = Math.random() * Math.PI * 2;
        n.vx = (Math.random() - 0.5) * 0.08;
        n.vy = (Math.random() - 0.5) * 0.08;
    });

    // ========================================================
    // 4. Cores por comunidade (espectro frio)
    // ========================================================
    const communityColors = [
        [100, 255, 218], // teal (accent original)
        [130, 210, 255], // azul claro
        [160, 255, 200], // verde-menta
        [100, 180, 255], // azul médio
        [180, 240, 220], // sage
        [120, 255, 240], // ciano claro
    ];

    // ========================================================
    // 5. Física em tempo real (movimento contínuo)
    // ========================================================
    const liveRepulsion = 0.6;
    const liveAttraction = 0.00002;
    const liveReturn = 0.0003;
    const liveDamping = 0.98;
    const maxDisplacement = 18;
    const perturbStrength = 0.012;

    let hoveredNode = null;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const time = Date.now() * 0.001;

        // Perturbação contínua (ruído senoidal por nó)
        nodes.forEach(n => {
            n.vx += Math.sin(time * 0.7 + n.phase) * perturbStrength;
            n.vy += Math.cos(time * 0.5 + n.phase * 1.3) * perturbStrength;
            n.vx += Math.cos(time * 0.3 + n.phase * 2.1) * perturbStrength * 0.5;
            n.vy += Math.sin(time * 0.4 + n.phase * 0.7) * perturbStrength * 0.5;
        });

        // Repulsão entre nós próximos
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
                if (dist < 50) {
                    const force = liveRepulsion / (dist * dist);
                    nodes[i].vx += (dx / dist) * force;
                    nodes[i].vy += (dy / dist) * force;
                    nodes[j].vx -= (dx / dist) * force;
                    nodes[j].vy -= (dy / dist) * force;
                }
            }
        }

        // Atração pelas edges
        edges.forEach(e => {
            const a = nodes[e.source], b = nodes[e.target];
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.1;
            const force = dist * liveAttraction;
            a.vx += (dx / dist) * force;
            a.vy += (dy / dist) * force;
            b.vx -= (dx / dist) * force;
            b.vy -= (dy / dist) * force;
        });

        // Mola de retorno + damping + limite de deslocamento
        nodes.forEach(n => {
            n.vx += (n.baseX - n.x) * liveReturn;
            n.vy += (n.baseY - n.y) * liveReturn;
            n.vx *= liveDamping;
            n.vy *= liveDamping;
            n.x += n.vx;
            n.y += n.vy;

            const dispX = n.x - n.baseX;
            const dispY = n.y - n.baseY;
            const dispDist = Math.sqrt(dispX * dispX + dispY * dispY);
            if (dispDist > maxDisplacement) {
                n.x = n.baseX + (dispX / dispDist) * maxDisplacement;
                n.y = n.baseY + (dispY / dispDist) * maxDisplacement;
                n.vx *= 0.7;
                n.vy *= 0.7;
            }
        });

        // ---- Hover detection ----
        hoveredNode = null;
        if (mouse.x !== null) {
            let minDist = Infinity;
            nodes.forEach(n => {
                const dx = n.x - mouse.x, dy = n.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < n.size + 12 && dist < minDist) {
                    minDist = dist;
                    hoveredNode = n;
                }
            });
        }

        const neighbors = new Set();
        const activeEdges = new Set();
        if (hoveredNode) {
            neighbors.add(hoveredNode.id);
            edges.forEach((e, i) => {
                if (e.source === hoveredNode.id || e.target === hoveredNode.id) {
                    activeEdges.add(i);
                    neighbors.add(e.source);
                    neighbors.add(e.target);
                }
            });
        }

        // ---- Desenhar edges ----
        edges.forEach((e, i) => {
            const a = nodes[e.source], b = nodes[e.target];
            const col = communityColors[a.community];
            const interComm = a.community !== b.community;

            let alpha, lw;
            if (hoveredNode) {
                if (activeEdges.has(i)) {
                    alpha = 0.5;
                    lw = interComm ? 0.7 : 1;
                } else {
                    alpha = interComm ? 0.04 : 0.08;
                    lw = 0.3;
                }
            } else {
                alpha = interComm ? 0.07 : 0.16;
                lw = interComm ? 0.4 : 0.6;
            }

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
            ctx.lineWidth = lw;
            ctx.stroke();
        });

        // ---- Desenhar nós ----
        nodes.forEach(n => {
            const col = communityColors[n.community];
            let alpha = n.opacity;
            let size = n.size;

            if (hoveredNode) {
                if (n.id === hoveredNode.id) {
                    alpha = 1;
                    size = n.size * 1.5;
                } else if (neighbors.has(n.id)) {
                    alpha = 0.75;
                    size = n.size * 1.1;
                } else {
                    alpha = n.opacity * 0.4;
                }
            }

            // Glow nos nós de alto grau
            if (n.degree > maxDegree * 0.6 && !hoveredNode) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, size + 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},0.04)`;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
            ctx.fill();
        });

        canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
        animFrameId = requestAnimationFrame(draw);
    }

    draw();
})();
