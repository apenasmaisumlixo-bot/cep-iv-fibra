// Load and display data from the JSON file
document.addEventListener('DOMContentLoaded', function() {
    loadGradesData();
    addAnimations();
});

async function loadGradesData() {
    try {
        const response = await fetch('planilha.json');
        const data = await response.json();
        
        populateGradesTable(data);
        updateSummaryCards(data);
    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
        showErrorMessage();
    }
}

function populateGradesTable(data) {
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = '';
    
    data.forEach((row, index) => {
        // Skip empty rows
        if (!row['Funcoes Biologicas CEP IV - Avaliação']) {
            return;
        }
        
        const tr = document.createElement('tr');
        tr.className = 'fade-in';
        tr.style.animationDelay = `${index * 0.1}s`;
        
        const avaliacao = row['Funcoes Biologicas CEP IV - Avaliação'] || '-';
        const nota = row['Unnamed: 1'] || '-';
        const notaFinal = row['Nota Final (arred. 0,76)'] || '-';
        const faltam = row['Faltam para 14'] || '-';
        const situacao = row['Situação'] || 'Sem dados';
        const mensagem = row['Mensagem de incentivo'] || '';
        
        // Determine status class
        let statusClass = 'status-no-data';
        if (situacao === 'Aprovado') {
            statusClass = 'status-approved';
        } else if (situacao === 'Em progresso') {
            statusClass = 'status-progress';
        }
        
        tr.innerHTML = `
            <td><strong>${avaliacao}</strong></td>
            <td>${nota}</td>
            <td>${notaFinal}</td>
            <td>${faltam}</td>
            <td><span class="${statusClass}">${situacao}</span></td>
            <td class="message-cell">${mensagem}</td>
        `;
        
        tableBody.appendChild(tr);
    });
}

function updateSummaryCards(data) {
    // Find specific rows for summary
    const aprovadoRow = data.find(row => row['Funcoes Biologicas CEP IV - Avaliação'] === 'Aprovado?');
    const mediaFinalRow = data.find(row => row['Funcoes Biologicas CEP IV - Avaliação'] === 'Média Final');
    const totalNPCRow = data.find(row => row['Funcoes Biologicas CEP IV - Avaliação'] === 'Total (NPC I + NPC II)');
    
    // Update general status
    const generalStatusElement = document.getElementById('generalStatus');
    if (aprovadoRow && aprovadoRow['Unnamed: 1'] === 'Sim') {
        generalStatusElement.textContent = 'APROVADO ✅';
        generalStatusElement.parentElement.className = 'summary-card approved';
    } else {
        generalStatusElement.textContent = 'EM PROGRESSO 📚';
        generalStatusElement.parentElement.className = 'summary-card progress';
    }
    
    // Update final grade
    const finalGradeElement = document.getElementById('finalGrade');
    if (mediaFinalRow && mediaFinalRow['Nota Final (arred. 0,76)']) {
        finalGradeElement.textContent = mediaFinalRow['Nota Final (arred. 0,76)'];
    } else {
        finalGradeElement.textContent = 'N/A';
    }
    
    // Update total NPC
    const totalNPCElement = document.getElementById('totalNPC');
    if (totalNPCRow && totalNPCRow['Nota Final (arred. 0,76)']) {
        totalNPCElement.textContent = totalNPCRow['Nota Final (arred. 0,76)'];
        if (parseFloat(totalNPCRow['Nota Final (arred. 0,76)']) >= 14) {
            totalNPCElement.parentElement.className = 'summary-card approved';
        }
    } else {
        totalNPCElement.textContent = 'N/A';
    }
}

function showErrorMessage() {
    const tableBody = document.getElementById('gradesTableBody');
    tableBody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; padding: 30px; color: #e74c3c;">
                <strong>Erro ao carregar os dados. Tente recarregar a página.</strong>
            </td>
        </tr>
    `;
}

function addAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add hover effects to anatomy images
    document.querySelectorAll('.anatomy-img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add click effect to summary cards
    document.querySelectorAll('.summary-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // Add search functionality (if needed in the future)
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Buscar avaliação...';
    searchInput.style.cssText = `
        width: 100%;
        max-width: 300px;
        padding: 10px 15px;
        border: 2px solid #ddd;
        border-radius: 25px;
        font-size: 14px;
        margin-bottom: 20px;
        transition: border-color 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#667eea';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#ddd';
    });
    
    // Add search input to grades section (commented out for now)
    // const gradesSection = document.querySelector('.grades-section');
    // gradesSection.insertBefore(searchInput, gradesSection.querySelector('.table-container'));
});

// Utility function to format grades
function formatGrade(grade) {
    if (grade === null || grade === undefined || grade === '') {
        return '-';
    }
    
    if (typeof grade === 'number') {
        return grade.toFixed(1);
    }
    
    return grade.toString();
}

// Function to calculate progress percentage
function calculateProgress(current, target) {
    if (!current || !target) return 0;
    return Math.min((current / target) * 100, 100);
}

// Add progress bars (future enhancement)
function addProgressBars() {
    const progressRows = document.querySelectorAll('tr[data-progress]');
    progressRows.forEach(row => {
        const progressValue = row.dataset.progress;
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-fill" style="width: ${progressValue}%"></div>
        `;
        row.appendChild(progressBar);
    });
}

