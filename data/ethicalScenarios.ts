import { type Edge, type Node } from '@vue-flow/core'

export const edges: Edge[] = [
  {
    id: 'root-decision1',
    label: 'Choice 1',
    source: 'root',
    target: 'decision1',
  },
  {
    id: 'root-decision2',
    label: 'Choice 2',
    source: 'root',
    target: 'decision2',
  },
  {
    id: 'decision1-outcome1',
    label: 'Leads to',
    source: 'decision1',
    target: 'outcome1',
  },
  {
    id: 'decision2-outcome2',
    label: 'Leads to',
    source: 'decision2',
    target: 'outcome2',
  },
]

export const nodes: Node[] = [
  {
    id: 'root',
    type: 'decision',
    position: {
      x: -250,
      y: 0,
    },
    data: {
      id: 'root',
      label: 'Self-Driving Car Dilemma',
      description:
        'A self-driving car faces an unavoidable accident and must choose between hitting elderly pedestrians or a young child.',
      frameworkCredences: {
        utilitarianism: 55,
        deontology: 20,
        virtueEthics: 10,
        contractualism: 10,
        careEthics: 5,
      },
      choices: [
        {
          text: 'Choice 1: Swerve to hit elderly pedestrians',
          targetNodeId: 'decision1',
          frameworkWeights: null,
          analysis: null,
        },
        {
          text: 'Choice 2: Stay on course and hit the young child',
          targetNodeId: 'decision2',
          frameworkWeights: null,
          analysis: null,
        },
      ],
    },
  },
  {
    id: 'decision1',
    type: 'decision',
    position: {
      x: -500,
      y: 450,
    },
    data: {
      id: 'decision1',
      label: 'Choice: Hit Elderly Pedestrians',
      description:
        'The car chooses to swerve, resulting in hitting the elderly pedestrians.',
      choices: [
        {
          text: 'Outcome: Elderly pedestrians are hit',
          targetNodeId: 'outcome1',
          frameworkWeights: {
            utilitarianism: {
              choiceWorthiness: 200,
              explanation:
                'Potentially saves more years of life (1 child vs. multiple elderly), maximizing overall well-being in terms of quantity of life saved. Assumes elderly have fewer remaining years.',
            },
            deontology: {
              choiceWorthiness: -300,
              explanation:
                'Intentionally causing harm, even to save others, can be seen as violating a duty not to kill.  May be seen as using the elderly as a means to an end (saving the child).',
            },
            virtueEthics: {
              choiceWorthiness: -100,
              explanation:
                "Might be seen as less virtuous to actively direct harm towards any group, even if for a 'greater good'.  Could be seen as a difficult but necessary action in a tragic situation, showing practical wisdom but lacking compassion in the act itself.",
            },
            contractualism: {
              choiceWorthiness: -200,
              explanation:
                'Could violate a social contract to protect vulnerable populations.  While all lives are valued, actively choosing to harm a group, even if statistically older, raises questions of fairness and equal protection.',
            },
            careEthics: {
              choiceWorthiness: -400,
              explanation:
                'Severely damages relationships and care for the elderly population.  Prioritizing the young child over the elderly might be seen as devaluing the lives and contributions of older individuals, breaking bonds of intergenerational care.',
            },
          },
          expectedChoiceWorthiness: -38.5,
          moralParliament: {
            stakeholderVotes: [
              {
                stakeholder: 'Utilitarian Efficiency Expert',
                perspective: 'Maximize lives saved',
                support: 8,
                reasoning:
                  'Hitting pedestrians saves the child and potentially more lives.  The goal is the best overall outcome, even if tragic.',
              },
              {
                stakeholder: 'Deontological Ethicist',
                perspective: 'Duty not to kill',
                support: 2,
                reasoning:
                  'Intentionally swerving to hit anyone is a violation of the duty not to kill.  The action itself is morally wrong, regardless of consequences.',
              },
              {
                stakeholder: 'Elderly Rights Advocate',
                perspective: 'Protection of vulnerable elderly',
                support: 1,
                reasoning:
                  'Choosing to hit the elderly is discriminatory and devalues their lives.  Society should protect all its members equally, especially the vulnerable.',
              },
              {
                stakeholder: "Child's Parent",
                perspective: 'Protect children',
                support: 9,
                reasoning:
                  "Any action that saves a child's life is paramount. Children are the future and deserve special protection.",
              },
            ],
            consensusScore: 5,
            summary:
              'Significant disagreement. Utilitarian and child-focused perspectives support this choice, while deontological and elderly rights perspectives strongly oppose.  No real consensus, reflecting deep ethical conflict.',
          },
          analysis:
            'Expected Choice-Worthiness is negative, indicating ethical concerns. Moral Parliament shows deep division, highlighting the conflict between utilitarian calculus and rights-based/care-based ethics. Utilitarianism, with the highest credence, somewhat supports this choice, but is heavily countered by deontological and care ethics considerations in the Moral Parliament.',
        },
      ],
      ethicalImplications: null,
    },
  },
  {
    id: 'decision2',
    type: 'decision',
    position: {
      x: 0,
      y: 450,
    },
    data: {
      id: 'decision2',
      label: 'Choice: Hit Young Child',
      description:
        'The car continues on its course, resulting in hitting the young child.',
      choices: [
        {
          text: 'Outcome: Young child is hit',
          targetNodeId: 'outcome2',
          frameworkWeights: {
            utilitarianism: {
              choiceWorthiness: -600,
              explanation:
                'Results in the death of a young child, potentially losing many years of life and future contributions.  Reduces overall well-being significantly compared to hitting pedestrians.',
            },
            deontology: {
              choiceWorthiness: -200,
              explanation:
                'While tragic, staying on course might be seen as less of a direct intentional act of harm compared to actively swerving to hit someone.  However, failing to act to minimize harm can also be seen as a deontological failure.',
            },
            virtueEthics: {
              choiceWorthiness: -500,
              explanation:
                "Failing to take action to save a life, especially a child's, could be seen as lacking compassion and practical wisdom. A virtuous agent would likely seek to minimize harm, even if imperfectly.",
            },
            contractualism: {
              choiceWorthiness: -400,
              explanation:
                'Violates the implicit social contract to protect vulnerable individuals, especially children.  Society has a strong obligation to safeguard the young and innocent.',
            },
            careEthics: {
              choiceWorthiness: -800,
              explanation:
                "Devastating impact on care relationships, especially for the child's family and community.  Failing to protect a child represents a profound failure of care and responsibility.",
            },
          },
          expectedChoiceWorthiness: -505,
          moralParliament: {
            stakeholderVotes: [
              {
                stakeholder: 'Utilitarian Efficiency Expert',
                perspective: 'Minimize total harm',
                support: 1,
                reasoning:
                  'Hitting the child results in greater overall harm in terms of potential life years lost and societal impact compared to hitting pedestrians.',
              },
              {
                stakeholder: 'Deontological Ethicist',
                perspective: 'Avoid direct intentional harm',
                support: 4,
                reasoning:
                  'Staying on course could be argued as less intentionally harmful than actively swerving to hit someone, though it still results in harm.  Focus is on minimizing direct culpability.',
              },
              {
                stakeholder: "Child's Parent",
                perspective: 'Protect my child at all costs',
                support: 0,
                reasoning:
                  'Unacceptable to choose to hit the child.  Every effort should be made to protect children, even at the expense of others in extreme situations.',
              },
              {
                stakeholder: 'General Public Representative',
                perspective: 'Value all lives, especially the young',
                support: 2,
                reasoning:
                  "Society generally places a high value on children's lives. Choosing to hit a child is morally repugnant to most people.",
              },
            ],
            consensusScore: 1.75,
            summary:
              'Strong opposition across all perspectives. Utilitarian, care ethics, and public sentiment strongly condemn hitting the child. Deontological perspective offers marginal support (avoiding direct intention), but overall, this choice is overwhelmingly rejected in the Moral Parliament.',
          },
          analysis:
            'Expected Choice-Worthiness is strongly negative, indicating severe ethical problems. Moral Parliament shows near-unanimous condemnation. All frameworks, especially care ethics and utilitarianism (given credences), strongly vote against this choice.  This is deemed highly unethical.',
        },
      ],
      ethicalImplications: null,
    },
  },
  {
    id: 'outcome1',
    type: 'decision',
    position: {
      x: -500,
      y: 900,
    },
    data: {
      id: 'outcome1',
      label: 'Outcome: Elderly Pedestrians Hit',
      description:
        'The self-driving car hits and likely kills the elderly pedestrians.',
      choices: [],
      ethicalImplications:
        'Tragic loss of life for the elderly pedestrians. Raises questions about ageism and the value of elderly lives in autonomous vehicle programming.  May cause public outrage and fear regarding self-driving car safety and ethical priorities. Could lead to legal and social repercussions for the car manufacturer and software developers.',
    },
  },
  {
    id: 'outcome2',
    type: 'decision',
    position: {
      x: 0,
      y: 900,
    },
    data: {
      id: 'outcome2',
      label: 'Outcome: Young Child Hit',
      description:
        'The self-driving car hits and likely kills the young child.',
      choices: [],
      ethicalImplications:
        "Devastating loss of a young child's life.  Likely to cause immense grief and suffering for the family and community.  Public outrage and condemnation would be intense.  May lead to severe legal and social repercussions, potentially halting or significantly hindering the development and deployment of self-driving car technology. Raises profound questions about the ethical responsibility for AI decision-making in life-or-death situations, particularly when vulnerable individuals like children are involved.",
    },
  },
]
