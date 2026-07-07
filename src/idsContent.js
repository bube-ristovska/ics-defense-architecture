// Informational content for the IDS paradigm panel on the right side of the
// diagram. 'ids-overview' opens from the column header; the four paradigm
// nodes open from their boxes. These nodes are reference material rather
// than hardening tasks, so every list is marked plain (no checklist items).

export const IDS_CONTENT = {
  'ids-overview': {
    blocks: [
      { h: 'Intrusion Detection in ICS' },
      { p: `The goal of this guide is not to produce a new perfect architecture for ICS systems, but to help harden the systems that already exist. When engineers bring security proposals to the boardroom, directors do not hear security: they hear risk, revenue and return on investment. The hardening checkpoints in this guide are therefore built around the tactics and techniques attackers actually use, while staying cost-aware.` },
      { p: `Two facts drive the need for detection. ICS protocols are insecure by design, and attackers are actively exploiting them. Since most ICS protocols cannot be retrofitted with authentication or encryption without replacing hardware, the realistic option is to monitor the traffic and flag when something looks wrong. That is the job of an Intrusion Detection System (IDS).` },
      { p: `IDS technology is mature in IT environments. Tools like Snort, Suricata and Zeek are widely deployed and well understood, but they have no native understanding of industrial protocols. A rule set designed for HTTP or SMB traffic provides no detection capability against a malicious Modbus write command or a crafted S7comm PDU. Custom parsers and rule sets must be written for each industrial protocol, and for proprietary protocols like Siemens S7 or BSAP, where documentation is limited, this is a significant undertaking.` },
      { p: `There is also a fundamental difference in what false positives cost. In IT, a false positive generates an alert and someone investigates. In OT, depending on the level of automation, a false positive can trigger a process shutdown, cause equipment damage or halt production. This is why OT environments generally use IDS in passive monitoring mode rather than IPS in active blocking mode, and why the false positive rate matters as much as the detection rate. The CIA triad is inverted in OT, where availability comes first, then integrity, then confidentiality.` },
      { p: `On the other hand, ICS traffic has properties that make it well-suited for anomaly detection. Sensors transmit at fixed intervals. Packet sizes are tightly defined by the protocol. Flow direction is predictable, since the master polls and the slave responds. TCP session lifetimes show very low variance. This means the baseline of normal behaviour is unusually stable compared to enterprise networks, and deviations from that baseline stand out clearly.` },
      { p: `The panel maps the four main detection paradigms onto the Purdue levels where each belongs. Lightweight specification checks sit at the field level, where timing is tightest and protocol-valid attacks must be caught early. Anomaly and ML detection sit at the supervisory level, where more compute is available. Signature-based detection sits closer to the enterprise boundary, where it identifies known variants quickly and with a low false positive rate. The hybrid approach spans all of them.` },

      { h: 'Benchmark Datasets' },
      { p: `Evaluating any IDS approach requires data, and this is one of the more practical problems in ICS security research. Real industrial environments rarely experience attacks, and when they do, the data is not made public. The research community relies on a small number of public datasets, each with different strengths and limitations.` },
      { p: `SWaT is the most cited benchmark. It was collected from a real scaled-down water treatment plant with real PLCs, actuators and sensors. It includes seven days of normal operation followed by 41 attack scenarios, with both network packets and physical sensor readings logged simultaneously. This dual-layer logging is what makes SWaT particularly valuable, since many ICS attacks are more visible at the process level than the network level.` },
      { p: `BATADAL covers water distribution rather than treatment. It is based on a simulated mid-sized network with fourteen attack scenarios designed to be subtle enough to challenge sophisticated detectors. It complements SWaT by covering a different part of the water infrastructure.` },
      { p: `HAI uses real PLCs with hardware-in-the-loop simulation of a thermal power plant and pumping system. It supports a range of AI-based anomaly detection approaches under realistic coupled physical process conditions, and because it requires only normal data for training it is more practically deployable than supervised approaches.` },
      { p: `The Gas Pipeline dataset from Mississippi State University provides Modbus TCP traffic from a simulated gas pipeline under normal operation and approximately 35 attack scenarios. Its Modbus-only traffic makes it well suited for protocol-specific detection evaluation.` },
      { p: `A critical limitation across all datasets is the generalisation gap. An IDS achieving 99% accuracy on SWaT under random train-test splits often degrades significantly on time-ordered splits or when applied to a different sector. A model trained on water treatment timing and sensor correlations has little in common with an electrical substation or a gas pipeline, so sector-specific retraining is required for every new environment. Adversarial robustness is rarely tested, and inconsistent metric reporting across studies makes cross-study comparison structurally difficult.` },

      { h: 'Open Challenges' },
      { list: [
        'Real-time constraints: deep models with the highest accuracy cannot process packets at Level 0-1 latencies without dedicated hardware, so lightweight checks belong at lower levels and complex ML at higher ones',
        'Data scarcity: supervised ML needs labelled attack data that is rare in real deployments, and public datasets cover limited infrastructure types',
        'Adversarial robustness: protocol-valid commands can evade both signature and anomaly detectors, and evaluation frameworks rarely test against adversarial inputs',
        'Legacy device heterogeneity: decades-old equipment running Modbus or BSAP cannot be patched or taken offline, and writing custom parsers for proprietary protocols requires significant expertise',
        'Concept drift: maintenance, firmware updates and seasonal process changes shift the normal-traffic baseline, causing elevated false positives until manual recalibration',
        'Explainability gap: unexplained alerts are ignored or cause confusion when operators must make fast decisions about physical processes',
      ], plain: true },

      { h: 'Emerging Directions' },
      { list: [
        'Federated learning: multiple organisations train a shared model without sharing raw data, addressing data scarcity and confidentiality while enabling cross-sector generalisation',
        'Digital twins: real-time software replicas of physical processes used as safe testbeds for IDS evaluation and adversarial robustness testing without risking real equipment',
        'Explainable AI: SHAP-based alert explanations that tell operators what triggered a detection and why are becoming standard in deployed hybrid IDS',
        'LLM-assisted alert triage: large language models translate raw IDS alerts into human-readable impact narratives, addressing the explainability gap without full model retraining',
        'Process-aware detection: moving beyond structural protocol validity to whether a command makes operational sense given the current process state',
      ], plain: true },

      { h: 'Resources' },
      { links: [
        { label: 'Snort, signature-based IDS', url: 'https://www.snort.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'SWaT dataset (iTrust, SUTD)', url: 'https://itrust.sutd.edu.sg/itrust-labs_datasets/' },
        { label: 'BATADAL dataset', url: 'https://www.batadal.net' },
        { label: 'HAI dataset', url: 'https://github.com/icsdataset/hai' },
      ] },
    ],
  },

  'ids-signature': {
    blocks: [
      { h: 'Signature-Based Detection' },
      { p: `Signature-based IDS works by comparing observed traffic against a database of known attack patterns. When the observed data matches a stored signature, an alert is raised. This is how Snort and Suricata work in IT environments.` },
      { p: `The strength is precision. When a signature matches, it is almost certainly a real attack. The false positive rate is very low, which is valuable in OT where false alarms are costly. Signature-based detection is also fast and lightweight, which makes it suitable for deployment at any level of the Purdue Model without introducing latency.` },
      { p: `The weakness is that signature-based systems are completely blind to anything not in their database. This limitation is critical given the documented threat landscape. PIPEDREAM issues valid protocol commands to legitimate devices: there is no malformed packet or known exploit payload to match. Volt Typhoon uses built-in system tools like PowerShell and WMI with valid credentials, generating no anomalous packets at all. Against these attack categories, signature-based detection achieves a detection rate of zero regardless of how many signatures are in the database.` },
      { p: `Signature-based detection is a foundational method that works well for known threats but is not sufficient on its own, and the inability to detect protocol-abuse attacks is one of the main weaknesses of current IDS deployments in ICS environments. Despite these limitations, it remains a valuable component in a multi-tiered system, where it serves as an efficient first filter for rapidly identifying known attacks and lets the heavier layers focus on anomalous or unknown behaviour.` },
      { p: `In this architecture, signature-based detection sits closest to the enterprise boundary (Levels 4-5), where it identifies known variants quickly and with a low false positive rate, and where the traffic mix most resembles the IT environments these tools were built for.` },

      { h: 'Resources' },
      { links: [
        { label: 'Snort, signature-based IDS', url: 'https://www.snort.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
      ] },
    ],
  },

  'ids-anomaly': {
    blocks: [
      { h: 'Anomaly-Based Detection' },
      { p: `Anomaly-based IDS takes the opposite approach to signatures. Instead of looking for known-bad patterns, it builds a model of what normal looks like and raises an alert when something deviates from that model. Because ICS traffic is so regular and predictable, anomaly detection is a natural fit for these environments. There are three subtypes.` },

      { h: 'Statistical Methods' },
      { p: `Statistical anomaly detection computes distributions of traffic features such as packet inter-arrival times, payload lengths and connection frequencies, and alerts when values fall outside expected ranges. These methods are lightweight, require no labelled attack data, and work well with the deterministic traffic patterns of ICS networks.` },
      { p: `The limitation is inflexibility. Statistical models assume that the distribution of normal traffic stays constant. In practice, maintenance windows, firmware updates and seasonal process changes shift the baseline, causing elevated false positive rates until the model is recalibrated. Statistical methods also struggle with slow-moving, living-off-the-land attacks such as Volt Typhoon, where the threat actor deliberately uses legitimate built-in tools and credentials to blend into normal activity. This produces individual observations that remain statistically indistinguishable from authorised behaviour even when examined in aggregate over weeks or months.` },

      { h: 'Knowledge-Based Methods' },
      { p: `Knowledge-based anomaly detection incorporates domain expertise about the physical process being controlled. For example, in a water treatment plant, such a system might enforce constraints that require dosing pump setpoints to remain within chemically safe limits, or that pressure readings must stay consistent with the current valve configuration. Any deviation from these physical constraints triggers an alert regardless of whether the network traffic matches a known signature.` },
      { p: `This approach is directly relevant to the Oldsmar water-treatment incident. A knowledge-based IDS encoding the allowable range for sodium hydroxide concentration would have flagged the change from 111 ppm to 11,100 ppm immediately, since it falls outside any operationally valid range. No such monitoring was deployed at the time, and the attack was caught only because an operator happened to be watching the screen.` },
      { p: `The SWaT dataset was designed specifically to support this kind of process-physics-aware detection. It captures both network traffic and physical sensor readings under 41 attack scenarios, which makes it the most widely cited benchmark in ICS IDS research.` },

      { h: 'Machine Learning and Deep Learning Methods' },
      { p: `ML-based anomaly detection is the most active area of current ICS IDS research. ML-based detection achieves high accuracy in controlled testbed environments, but results are difficult to generalise across different industrial settings because of differences in process behaviour, protocols and traffic patterns.` },
      { p: `Supervised classifiers including Random Forests, SVMs and gradient-boosted trees train on labelled examples of normal and attack traffic. On benchmarks like SWaT, these methods consistently achieve F1 scores above 0.90 for binary classification. On BATADAL, which presents a harder detection problem due to class imbalance and stealthy attack scenarios, the best reported F1 scores fall in the range of 0.70 to 0.75. However, supervised methods require labelled attack data that is scarce in real deployments: ICS networks rarely experience attacks, and when they do, labelling the data requires expert knowledge that is not always available.` },
      { p: `Unsupervised approaches, including autoencoders and clustering algorithms, learn the structure of normal traffic without labelled attack examples and flag observations that cannot be reconstructed or that fall in low-density regions of the feature space. Because they require only normal data for training, they are more practically deployable. The HAI dataset, which uses real PLCs with hardware-in-the-loop simulation, was designed to support AI-based anomaly detection research under realistic PLC behaviour.` },
      { p: `Deep learning methods extend these ideas. LSTM networks and Transformers capture temporal structure in ICS traffic, including polling cycle regularity. Graph Neural Networks model the network as a graph where nodes are devices and edges are communication links, which allows detection of abnormal communication patterns between devices that should not normally interact. However, deep models introduce latency that is incompatible with Level 0-1 timing requirements: fieldbus and process bus cycles typically operate in the range of one to ten milliseconds, with some protocols such as IEC 61850 Sampled Values requiring sub-millisecond response times. Without dedicated hardware accelerators, this makes deep models better suited to Level 2-3 deployment.` },
      { p: `A key challenge for all ML-based detectors is adversarial robustness. An attacker who knows what model is deployed can craft inputs that stay within the model's normal region while still achieving their objective. PIPEDREAM illustrates this threat: an attacker can issue protocol-valid commands using standard ICS protocols and native tooling that an anomaly detector trained on normal data would not flag, since the individual commands are indistinguishable from legitimate operator activity.` },

      { h: 'Resources' },
      { links: [
        { label: 'SWaT dataset (iTrust, SUTD)', url: 'https://itrust.sutd.edu.sg/itrust-labs_datasets/' },
        { label: 'BATADAL dataset', url: 'https://www.batadal.net' },
        { label: 'HAI dataset', url: 'https://github.com/icsdataset/hai' },
      ] },
    ],
  },

  'ids-specification': {
    blocks: [
      { h: 'Specification-Based Detection' },
      { p: `Specification-based IDS compares observed behaviour against formal or semi-formal rules derived from engineering knowledge of the controlled process. The rules specify which function codes are valid on a given network segment, which devices are allowed to communicate, what setpoint values are physically plausible, and what command sequences are expected during normal operation. Any traffic that violates these rules is flagged, even if it does not match a known signature and even if it is statistically normal.` },
      { p: `This approach is particularly well-suited to detecting attacks that use valid protocol commands. Industroyer2 communicated using valid IEC-104 frames. PIPEDREAM uses valid Modbus and OPC UA commands. From a signature perspective these attacks are invisible. From a statistical perspective they may not deviate enough from the baseline to trigger an alert. But a specification that defines the allowed command sequences for a specific substation would still flag any sequence that falls outside normal operations, even when each individual command is syntactically correct.` },
      { p: `Specification-based detection can be seen as a subclass of anomaly detection that is particularly suited to ICS environments, where the deterministic and predictable nature of communication allows normal behaviour to be formally specified. The limitation is that building and maintaining specifications requires deep domain knowledge of both the protocols and the physical process, which makes them expensive to develop and costly to update when configurations change. This is also the main reason adoption remains low, even though protocol-valid attacks are exactly the class of threat this paradigm covers best.` },
      { p: `An important sub-category models process invariants, which are causal relationships between commands and expected physical responses. If a pump is turned on, the flow should increase. If a valve is closed, the pressure upstream should rise. If a command leads to a physical outcome that does not match these relationships, an alert is raised. This approach bridges the gap between network-level monitoring and process-level understanding.` },
      { p: `In this architecture, lightweight specification checks sit at the field level (Levels 0-1), where timing is tightest and protocol-valid attacks must be caught early, before they reach controllers and field devices.` },
    ],
  },

  'ids-hybrid': {
    blocks: [
      { h: 'Hybrid Detection' },
      { p: `The limitations of individual methods have made hybrid IDS the dominant trend in recent research. No individual technique covers the full range of threats. Signature-based methods miss novel attacks, statistical anomaly detectors generate false positives during operational changes, and specification-based systems are expensive to maintain. Combining methods addresses these gaps by allowing each layer to compensate for the weaknesses of the others.` },
      { p: `The most common hybrid architecture pairs a signature-based or specification-based layer with an ML-based anomaly detection layer. The rule-based layer handles structural protocol enforcement, quickly flagging traffic that violates permissible communication patterns with low false positives. The anomaly detection layer handles behavioural deviations that remain within rule boundaries, such as unusual volumes of legitimate commands or access to registers that are valid but operationally unexpected.` },
      { p: `A concrete example of a multi-tiered architecture is a three-tier system that separates detection into three sequential decisions. The first asks whether the traffic is malicious or benign. The second asks what category of attack it is. The third asks what the specific variant is. Each tier uses a different classifier, and because the complex models are only applied to traffic that the lightweight first tier has already flagged, the system preserves real-time performance. On the Mississippi State gas pipeline dataset, such a system achieved F-measures of 87.4% at tier 1, 74.5% at tier 2, and 44.5% at tier 3, which shows the expected degradation as classification becomes more fine-grained.` },
      { p: `Explainability has become an important additional requirement. An IDS that generates an alert without explaining why places the burden on operators who are managing time-critical physical processes. SHAP (SHapley Additive exPlanations) is being integrated into hybrid systems to produce interpretable feature attributions that identify which input variables drove an alert, rather than a raw anomaly score. In OT environments where operators may not have cybersecurity backgrounds, this kind of interpretability can determine whether an alert is acted on or ignored.` },
      { p: `The paradigms map onto the Purdue Model exactly as this panel shows. Lightweight specification checks sit at the field level, where timing is tightest and protocol-valid attacks must be caught early. Anomaly and ML detection sit at the supervisory level, where more compute is available. Signature-based detection sits closer to the enterprise boundary, where it identifies known variants quickly and with a low false positive rate. The hybrid approach spans all of them.` },

      { h: 'Coverage Against Recent Threats' },
      { p: `The most important way to compare IDS approaches for a defence architecture is not by their aggregate accuracy on benchmarks, but by their coverage against documented attacks:` },
      { list: [
        'Oldsmar HMI setpoint change: missed by signatures; partial statistical and ML coverage; specification and hybrid coverage conditional on a complete, current specification',
        'Colonial Pipeline VPN lateral movement: missed by signatures and specifications; detected by statistical and ML methods on the IT side; covered by hybrid systems',
        'Industroyer2 IEC-104 commands: signatures only after disclosure; partial statistical and ML coverage; earliest coverage from specifications; covered by hybrid systems',
        'PIPEDREAM protocol-valid commands: missed by signatures; partial statistical and ML coverage; specification coverage conditional; covered by hybrid systems',
        'EKANS process termination: partial signature coverage; detected by statistical and ML methods; covered by hybrid systems',
        'Volt Typhoon living-off-the-land activity: missed by signatures and specifications; only partial statistical, ML and hybrid coverage',
      ], plain: true },
      { p: `The pattern is clear: no single paradigm provides adequate coverage. Signature-based detection fails against protocol-valid and living-off-the-land attacks at zero-day, and only becomes applicable to known malware families such as Industroyer2 after post-disclosure analysis and signature development. Specification-based detection provides the earliest coverage of Industroyer2 and PIPEDREAM, and is the only approach capable of flagging these attacks before signatures exist, but it requires complete and current specifications and cannot detect attacks that stay within specification boundaries. ML-based anomaly detection covers the widest range but struggles with stealthy APT reconnaissance. Only hybrid systems approach adequate coverage, and even they show only partial effectiveness against long-duration Volt Typhoon-style activity.` },

      { h: 'Recommendation for This Architecture' },
      { p: `Based on the comparative analysis, the detection component of this defence architecture uses a hybrid approach. It combines specification-based enforcement at the protocol layer, which defines allowable function codes, device pairs, setpoint ranges and command sequences for each Purdue zone, with ML-based anomaly detection at the behavioural layer, which is trained on normal traffic baselines to catch deviations that remain within specification bounds.` },
      { p: `This combination is chosen for three reasons. First, the coverage analysis shows that hybrid systems are the only approach that covers the majority of documented attack categories. Second, the specification layer provides the low false positive rates required in OT environments, while the ML layer provides the zero-day detection capability that specifications alone cannot offer. Third, the tiered deployment model, where lightweight specification checks run at lower Purdue levels and heavier ML processing runs at Levels 2-3, respects the real-time constraints of industrial networks and follows the placement shown in this panel.` },

      { h: 'Resources' },
      { links: [
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'SHAP, explainable AI library', url: 'https://github.com/shap/shap' },
      ] },
    ],
  },
};
