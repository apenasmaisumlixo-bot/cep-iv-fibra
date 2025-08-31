# CEP IV - Funções Biológicas | FIBRA

Site desenvolvido para os estudantes de medicina da FIBRA acompanharem seu progresso acadêmico na disciplina de Funções Biológicas CEP IV.

## Características

- **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- **Decoração Temática**: Desenhos anatômicos feitos com giz em quadro negro
- **Dados Dinâmicos**: Carrega automaticamente as notas da planilha
- **Interface Amigável**: Layout moderno com animações suaves
- **Mensagens Motivacionais**: Incentivos personalizados baseados no progresso

## Tecnologias Utilizadas

- HTML5
- CSS3 (com gradientes e animações)
- JavaScript (ES6+)
- Google Fonts (Inter)

## Como Hospedar no GitHub Pages

### Passo 1: Criar um Repositório no GitHub
1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em "New repository"
3. Nome sugerido: `cep-iv-fibra`
4. Marque como "Public"
5. Clique em "Create repository"

### Passo 2: Fazer Upload dos Arquivos
1. Na página do repositório, clique em "uploading an existing file"
2. Arraste todos os arquivos desta pasta para a área de upload:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `planilha.json`
   - `chalk_heart.png`
   - `chalk_brain.png`
   - `chalk_skeleton.png`
3. Adicione uma mensagem de commit: "Adicionar site CEP IV"
4. Clique em "Commit changes"

### Passo 3: Ativar GitHub Pages
1. No repositório, vá em "Settings"
2. Role para baixo até "Pages" no menu lateral
3. Em "Source", selecione "Deploy from a branch"
4. Em "Branch", selecione "main"
5. Clique em "Save"

### Passo 4: Acessar o Site
Após alguns minutos, o site estará disponível em:
`https://[seu-usuario].github.io/cep-iv-fibra`

## Estrutura dos Arquivos

```
cep-iv-website/
├── index.html          # Página principal
├── styles.css          # Estilos e layout
├── script.js           # Funcionalidades JavaScript
├── planilha.json       # Dados das notas
├── chalk_heart.png     # Desenho do coração
├── chalk_brain.png     # Desenho do cérebro
├── chalk_skeleton.png  # Desenho do esqueleto
└── README.md           # Este arquivo
```

## Personalização

### Atualizar Notas
Para atualizar as notas, edite o arquivo `planilha.json` com os novos dados.

### Modificar Cores
As cores principais podem ser alteradas no arquivo `styles.css`:
- Gradiente de fundo: linhas 9-10
- Cores dos cards: linhas 200-250

### Adicionar Novas Imagens
Coloque as imagens na pasta raiz e referencie no HTML ou CSS.

## Suporte

Este site foi desenvolvido especificamente para os estudantes de medicina da FIBRA. Para dúvidas ou sugestões, entre em contato com a coordenação do curso.

---

**Centro Universitário FIBRA - Curso de Medicina**  
*Desenvolvido com ❤️ para os futuros médicos*

