import { type Edge, type Node } from '@vue-flow/core'

export const edges: Edge[] = [
  {
    id: 'root-decision_pedestrians',
    label: 'Choice',
    source: 'root',
    target: 'decision_pedestrians',
  },
  {
    id: 'root-decision_child',
    label: 'Choice',
    source: 'root',
    target: 'decision_child',
  },
  {
    id: 'decision_pedestrians-outcome_pedestrians',
    label: 'Leads To',
    source: 'decision_pedestrians',
    target: 'outcome_pedestrians',
  },
  {
    id: 'decision_child-outcome_child',
    label: 'Leads To',
    source: 'decision_child',
    target: 'outcome_child',
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
        'A self-driving car faces an unavoidable accident and must choose between hitting a group of elderly pedestrians or a young child.',
      frameworkCredences: {
        utilitarianism: 35,
        deontology: 30,
        virtueEthics: 15,
        contractualism: 10,
        careEthics: 10,
      },
      choices: [
        {
          text: 'Choice: Swerve to hit Elderly Pedestrians',
          targetNodeId: 'decision_pedestrians',
        },
        {
          text: 'Choice: Continue Straight to hit Young Child',
          targetNodeId: 'decision_child',
        },
      ],
    },
  },
  {
    id: 'decision_pedestrians',
    type: 'decision',
    position: {
      x: -500,
      y: 450,
    },
    data: {
      id: 'decision_pedestrians',
      label: 'Decision: Hit Elderly Pedestrians',
      description:
        'The self-driving car chooses to swerve and hit the group of elderly pedestrians to avoid hitting the young child.',
      choices: [
        {
          text: 'Outcome: Elderly Pedestrians Hit',
          targetNodeId: 'outcome_pedestrians',
          frameworkWeights: {
            utilitarianism: {
              choiceWorthiness: -600,
              explanation:
                'Negative outcome as multiple lives are lost, though fewer potential years of life lost compared to a child.',
            },
            deontology: {
              choiceWorthiness: -400,
              explanation:
                'Violates the duty not to kill. However, it could be argued to uphold a higher duty to protect the more vulnerable (child).',
            },
            virtueEthics: {
              choiceWorthiness: -500,
              explanation:
                'May be seen as less compassionate towards the elderly, potentially prioritizing youth over age, which might not align with virtues like fairness to all age groups.',
            },
            contractualism: {
              choiceWorthiness: -300,
              explanation:
                'Potentially violates the social contract to protect all citizens equally, although age might be argued as a differentiating factor in extreme dilemmas.',
            },
            careEthics: {
              choiceWorthiness: -700,
              explanation:
                'Significant harm to the care network and relationships associated with multiple elderly individuals. Loss of established community members.',
            },
          },
          expectedChoiceWorthiness: -495,
          moralParliament: {
            stakeholderVotes: [
              {
                stakeholder: 'Parent of Young Child',
                perspective:
                  'Child-centric, prioritizing the young and vulnerable',
                support: 9,
                reasoning:
                  "Saving a child's life is paramount; elderly individuals have lived fuller lives.",
              },
              {
                stakeholder: 'Elderly Community Advocate',
                perspective: 'Age-neutral, valuing all lives equally',
                support: 2,
                reasoning:
                  'Age discrimination is unacceptable; all lives have equal value regardless of age. Sacrificing multiple lives for one is unjust.',
              },
              {
                stakeholder: 'Utilitarian Ethicist',
                perspective: 'Utilitarian, minimizing overall suffering',
                support: 5,
                reasoning:
                  'While tragic, losing elderly individuals might result in less overall years of life lost and potentially less overall suffering, depending on circumstances.',
              },
            ],
            consensusScore: 5.3,
            summary:
              'Significant disagreement. Child-centric view strongly supports this choice, while age-neutral and some utilitarian perspectives raise strong objections.  Consensus is low due to conflicting values regarding age and number of lives.',
          },
          analysis:
            "Expected Choice-Worthiness is negative, indicating ethical challenges. Moral Parliament reveals a deeply divided ethical landscape. Utilitarianism is weakly supportive or neutral depending on specific calculations of 'good', while Deontology, Virtue Ethics, Contractualism, and Care Ethics raise concerns, though less intensely than for the alternative. Recommendation:  Ethically problematic, low confidence in clear 'right' choice due to inherent tragedy.",
        },
      ],
    },
  },
  {
    id: 'decision_child',
    type: 'decision',
    position: {
      x: 0,
      y: 450,
    },
    data: {
      id: 'decision_child',
      label: 'Decision: Hit Young Child',
      description:
        'The self-driving car chooses to continue straight and hit the young child to avoid hitting the group of elderly pedestrians.',
      choices: [
        {
          text: 'Outcome: Young Child Hit',
          targetNodeId: 'outcome_child',
          frameworkWeights: {
            utilitarianism: {
              choiceWorthiness: 400,
              explanation:
                'Potentially positive utilitarian outcome as fewer lives are lost (only one life vs. multiple).',
            },
            deontology: {
              choiceWorthiness: -800,
              explanation:
                'Strong violation of the duty not to harm innocents, especially a child. Considered deeply morally wrong to intentionally target a child.',
            },
            virtueEthics: {
              choiceWorthiness: -900,
              explanation:
                'Highly unvirtuous act. Lacks compassion, care, and justice.  Considered cruel and deeply flawed character decision.',
            },
            contractualism: {
              choiceWorthiness: -700,
              explanation:
                'Severe violation of the social contract to protect the most vulnerable, especially children.  Breaches foundational principles of justice and protection.',
            },
            careEthics: {
              choiceWorthiness: -950,
              explanation:
                'Devastating harm to the care network and relationships centered around a child.  Loss of future potential and profound emotional impact on family and community.',
            },
          },
          expectedChoiceWorthiness: -467.5,
          moralParliament: {
            stakeholderVotes: [
              {
                stakeholder: 'Parent of Young Child',
                perspective: 'Child-centric, absolute protection of children',
                support: 0,
                reasoning:
                  'Utterly unacceptable to sacrifice a child. Morally reprehensible and unthinkable. Violates fundamental parental instincts and societal values.',
              },
              {
                stakeholder: 'Elderly Community Advocate',
                perspective:
                  'Age-neutral, but potentially leaning towards minimizing total deaths',
                support: 6,
                reasoning:
                  "While tragic, minimizing the number of deaths might be seen as the 'lesser of two evils' in a purely numerical sense. However, deeply regrets the loss of a child.",
              },
              {
                stakeholder: 'Deontological Ethicist',
                perspective: 'Deontological, rule-based ethics',
                support: 1,
                reasoning:
                  'Absolutely forbidden to intentionally harm a child.  Duty to protect the vulnerable outweighs numerical considerations in this extreme case.',
              },
            ],
            consensusScore: 2.3,
            summary:
              'Extremely low consensus. Overwhelming moral opposition to sacrificing a child, especially from child-centric and deontological perspectives. Utilitarianism offers weak, numerically-based support, but is heavily outweighed by other ethical frameworks.  Consensus is near non-existent due to the profound moral abhorrence of harming a child.',
          },
          analysis:
            'Expected Choice-Worthiness is also negative, and slightly lower than hitting pedestrians, reflecting the strong negative moral weight of harming a child in many frameworks. Moral Parliament shows near-unanimous condemnation of this choice outside of a narrow, purely numerical utilitarian perspective.  Deontology, Virtue Ethics, Contractualism, and Care Ethics strongly condemn this choice. Recommendation: Ethically highly problematic and likely unacceptable. Extremely low confidence in this being a justifiable choice.',
        },
      ],
    },
  },
  {
    id: 'outcome_pedestrians',
    type: 'decision',
    position: {
      x: -500,
      y: 900,
    },
    data: {
      id: 'outcome_pedestrians',
      label: 'Outcome: Elderly Pedestrians Hit Consequence',
      description:
        'The self-driving car hits and kills the elderly pedestrians, saving the young child.',
      choices: [],
      ethicalImplications:
        "Tragic loss of multiple lives, potential social outcry regarding age discrimination or perceived devaluation of elderly lives, but also relief and societal approval for saving a child's life. Legal and moral questions arise about algorithmic bias and the value of different lives in autonomous systems.  Emotional distress and grief for families of the deceased and potential moral injury for those involved in programming or validating the system.",
    },
  },
  {
    id: 'outcome_child',
    type: 'decision',
    position: {
      x: 0,
      y: 900,
    },
    data: {
      id: 'outcome_child',
      label: 'Outcome: Young Child Hit Consequence',
      description:
        'The self-driving car hits and kills the young child, saving the elderly pedestrians.',
      choices: [],
      ethicalImplications:
        "Tragic loss of a child's life, potential for intense public outrage, moral condemnation, and legal repercussions for prioritizing elderly lives over a child. Deep societal questioning of values, algorithmic ethics, and the perceived 'coldness' of utilitarian calculations.  Devastating grief for the family of the child, potential erosion of trust in autonomous technology, and significant long-term societal trauma.",
    },
  },
]
