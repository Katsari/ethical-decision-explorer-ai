# Ethical Decision Explorer

An interactive web application that helps explore ethical questions through decision trees, powered by LLMs.

## Features

- Interactive decision tree visualization
- Multiple ethical theories/frameworks support:
  - Utilitarianism
  - Deontological Ethics
  - Virtue Ethics
  - Contractualism
  - Care Ethics
- Real-time AI-powered decision tree generation
- Responsive and modern UI with Nuxt UI
- Beautiful animated tree layouts with Vue Flow

## Analysis Methods

### Maximize Expected Choice-Worthiness (MEC)

When faced with an ethical decision, the app helps you weigh different moral perspectives by calculating Expected Choice-Worthiness:

- **Ethical Theory credence**: Assigns probability weights (0-100%) to different ethical theories based on how likely they are to be true
- **Choice-worthiness**: Evaluates the moral value of each choice (-1000 to 1000) based on how well it aligns with different theories
- **Expected value calculation**: Multiplies credence by choice-worthiness to produce an overall ethical score
- **Multi-theory analysis**: Incorporates perspectives from:
  - Utilitarianism (maximizing overall good)
  - Deontology (moral rules and duties)
  - Virtue Ethics (character development)
  - Contractualism (justice and mutual agreement)
  - Care Ethics (relationships and care)

### Moral Parliament Deliberation

Complements the quantitative analysis with a deliberative approach that simulates stakeholder perspectives:

- **Stakeholder representation**: For each stakeholder:

  - Identity and role in the decision
  - Ethical perspective and viewpoint
  - Support score (0-10) indicating position strength
  - Detailed reasoning for their stance

- **Deliberation outcome**:
  - Consensus score (0-10) measuring stakeholder agreement
  - Analysis of competing viewpoints
  - Potential paths to resolution
  - Final synthesis with confidence level

By combining MEC with moral parliament deliberation, you can explore how different ethical theories compete and overlap, hear from various stakeholders, and arrive at well-reasoned decisions with confidence in your ethical reasoning.

## Technologies

- Nuxt.js 3
- Vue 3
- TypeScript
- Vue Flow
- Nuxt UI
- Tailwind CSS
- Google Gemini API

## Prerequisites

- Node.js 20 or later
- A Google Gemini API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd ethical-analysis-visualizer-ai
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## License

MIT
