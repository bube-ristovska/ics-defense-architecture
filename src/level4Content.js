// Level 4 (Business and Logistics Systems) hardening guide content, keyed by
// diagram node id. 'l4' is the level-wide overview shown when the band label
// is clicked; the rest are per-component deep dives shown when a specific
// asset box is clicked. Mirrors the structure of level5Content.js: business
// applications (ERP, Production Planning, Maintenance, Logistics) sit
// alongside the shared infrastructure tier that supports them (Databases,
// Identity & Access, Integration & APIs).
//
// Block shapes: { h } sub-heading, { p } paragraph, { list } bullet list,
// { links } a labeled list of external resources (real URLs where
// available, otherwise a search link built from the exact recommended
// search term).

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const LEVEL4_CONTENT = {
  l4: {
    blocks: [
      { h: 'Business and Logistics Systems' },
      { p: `Level 4 contains the business systems that translate commercial demand into production, maintenance, inventory and logistics activities. Typical systems include enterprise resource planning (ERP), warehouse management systems (WMS), transportation management systems (TMS), computerized maintenance management systems (CMMS), enterprise asset management platforms, quality-management applications, production-planning systems, databases, reporting platforms, integration middleware and electronic data interchange services. In the ISA-95 model, these systems support business planning and logistics over time periods ranging from shifts and days to weeks and months.` },
      { p: `Although Level 4 belongs to the IT side of the Purdue Model, it is more closely connected to industrial operations than Level 5. Level 5 provides organization-wide services such as corporate email, collaboration and general user computing, while Level 4 contains the applications that determine what should be produced, when maintenance should occur, which materials are available and how completed products should be stored or transported. Disruption or manipulation at this level may therefore stop production even when the controllers and field devices remain operational.` },
      { p: `The main security objective at Level 4 is to protect the confidentiality, integrity and availability of business and logistics data while preventing compromised business systems from becoming a route into Level 3 and the lower operational levels. This requires strong identity controls, restricted communication across the IT/OT boundary, secure application and database configuration, controlled third-party integration, reliable backups and monitoring that covers both conventional security events and abnormal business transactions.` },

      { h: 'Role of Level 4 in the Purdue Model' },
      { p: `Level 4 converts business requirements into information that can be used by the manufacturing operations systems at Level 3. An ERP platform may generate production orders, a maintenance-management platform may issue work orders, and a warehouse platform may provide material availability or shipment status. Level 3 systems may return production totals, equipment status, quality results and process summaries to Level 4.` },
      { p: `These exchanges are necessary, but they must not create unrestricted network trust. Level 4 systems should not communicate directly with PLCs, RTUs, HMIs or other systems at Levels 2, 1 or 0. Communication with Level 3 should pass through the industrial demilitarized zone at Level 3.5 using approved services such as replicated historian databases, application gateways, message brokers, secure file-transfer services or integration servers. Direct routing, shared database access and unrestricted remote administration across the boundary should be prohibited.` },
      { p: `Where information is required only for reporting or analysis, data should flow from the operational environment toward Level 4 without creating an equivalent command path in the opposite direction. One-way transfer mechanisms may be appropriate for high-consequence environments. Where bidirectional communication is required, such as the transfer of production schedules from ERP to a manufacturing execution system, the messages should be authenticated, validated and restricted to the defined data structure and business process.` },
      { p: `Level 4 also represents an important containment boundary. An ordinary corporate workstation compromised at Level 5 should not automatically gain access to production-planning, maintenance or logistics applications. Similarly, compromise of a Level 4 server should not provide direct access to the operational network. Access decisions should be based on the identity of the user or service, the target resource and the approved business purpose rather than only on the network location of the requesting system.` },

      { h: 'Threat Landscape Summary' },
      { p: `Level 4 threats use much of the same vocabulary of techniques described for Level 5. IT-side techniques map to MITRE ATT&CK Enterprise, while techniques with an operational-impact equivalent also map to ATT&CK for ICS. See the ERP System, Production Planning, Maintenance Mgmt, Logistics, Databases, Identity & Access and Integration & APIs nodes on this level for the specific techniques, incidents and controls addressing each part of this chain.` },
      { p: `The most important architectural Level 4 threat is lateral movement toward Level 3. Attackers may search for dual-homed servers, shared Active Directory domains, historian connections, database links, remote administration tools or service accounts that work in both environments. A representative Level 4 attack path can be summarized as: compromise of a Level 5 account or Level 4 application → privilege escalation or service-account theft → access to ERP, WMS, CMMS or integration middleware → discovery of production interfaces and credentials → compromise of a Level 4-to-Level 3 connection → access to a historian replica, manufacturing execution server or OT-facing jump host → attempted movement into the site operations network. Segmentation must ensure that compromise of a Level 4 application does not automatically complete this path. See the Integration & APIs node for the detailed mechanics of this attack path.` },

      { h: 'AI-Assisted Attack Activity' },
      { p: `As at Level 5, artificial intelligence can lower the effort required to attack Level 4 systems. Attackers may use generative AI to craft convincing business-email-compromise and invoice-fraud messages aimed at finance and procurement staff, to interpret stolen ERP or logistics documentation, to identify vulnerable application components, and to help write or adapt scripts that interact with business APIs.` },
      { p: `This does not create a new attack path. It increases the speed, scale and quality of existing techniques such as credential theft, transaction manipulation and application exploitation. The controls proposed across this level, including multi-factor authentication, separation of duties, application and API hardening, patching, segmentation and transaction monitoring, remain the correct response. As at Level 5, AI-generated configuration commands, scripts or recommendations affecting identity, integration interfaces or systems connected to Level 3 should be verified by a person before execution.` },

      { h: 'Change Management' },
      { p: `Changes to application code, database schemas, firewall rules, integration mappings, scheduled jobs and business workflows should require approval and a rollback plan.` },
      { p: `Changes crossing the Level 4-to-Level 3 boundary require joint review by IT, OT and the relevant process owner. A small modification to an ERP interface may generate unexpected messages or transaction volumes at Level 3.` },
      { p: `Emergency changes should be permitted through a shortened approval process, but they must still be documented and reviewed afterward. Direct undocumented changes make incident investigation and recovery significantly more difficult.` },

      { h: 'Business-Impact Analysis and Recovery Planning' },
      { p: `A business-impact analysis should identify the effect of ERP, WMS, TMS, CMMS, database and integration outages. It should determine acceptable downtime, acceptable data loss, recovery dependencies and restoration order.` },
      { p: `Recovery plans should address ransomware, data corruption, cloud-service outage, identity-service failure, partner compromise and loss of the Level 4-to-Level 3 interface.` },
      { p: `Application owners, infrastructure teams, OT personnel, warehouse managers and business-process owners should participate in recovery exercises. Technical recovery is incomplete if the application server is operational but users cannot authenticate, integration jobs do not run or the restored database is inconsistent.` },

      { h: 'Manual Fallback Procedures' },
      { p: `Critical business and logistics processes should have documented procedures for periods when Level 4 systems are unavailable. These procedures may include manual production-order handling, temporary shipment documentation, inventory reconciliation, maintenance authorization and communication with suppliers or carriers.` },
      { p: `Fallback procedures should define who may authorize manual operation, which records must be retained and how transactions will be reconciled after the system is restored. Uncontrolled manual work can create additional integrity and safety problems.` },

      { h: 'Supply-Chain and Logistics Security Management' },
      { p: `Cybersecurity should be included in the wider security management of the supply chain. Security risks may affect information systems, partner relationships, transportation processes and the availability or integrity of goods. ISO 28000 provides a management-system framework addressing security and resilience in the supply chain. The technical controls covered on this level should therefore be connected to supplier assessment, procurement, contract management and business-continuity planning rather than being treated only as an IT responsibility.` },

      { h: 'Incident Response' },
      { p: `Incident-response procedures should define how Level 4 systems can be isolated without causing uncontrolled effects on production and logistics. The response team must understand which applications provide data or instructions to Level 3 and what happens when those flows are interrupted. The plan should identify:` },
      { list: [
        'Who can isolate a Level 4 application',
        'Who must notify the production site',
        'Which interfaces should be disabled first',
        'How evidence and logs will be preserved',
        'How external partners will be contacted',
        'How manual procedures will be activated',
        'Who authorizes restoration of service',
      ] },
      { p: `Incident response should be integrated with the wider cybersecurity risk-management process and exercised regularly.` },

      { h: 'Implementation Priority' },
      { p: `The highest-priority Level 4 measures are:` },
      { list: [
        'An authoritative asset and communication-flow inventory',
        'MFA and role-based access for privileged and sensitive applications',
        'Separation of duties for high-impact transactions',
        'Removal of shared and excessive administrative access',
        'Network separation between Level 4, Level 5 and the industrial DMZ',
        'Prohibition of direct communication with Levels 2, 1 and 0',
        'Allowlisting of Level 4-to-Level 3 data flows',
        'Secure configuration and patching of exposed applications',
        'Protection of APIs, EDI and file-transfer services',
        'Centralized application, database and security logging',
        'Isolated backups with tested application restoration',
        'Time-limited and monitored third-party access',
        'Documented fallback and recovery procedures',
      ] },
      { p: `These measures make Level 4 a controlled intermediary between corporate IT and industrial operations rather than an unrestricted bridge. They also protect the integrity and availability of the business processes on which production, maintenance and logistics depend.` },

      { h: 'Resources' },
      { links: [
        { label: 'ISA-95 / IEC 62264-1 model for defining Level 4 scope', url: search('IEC 62264-1 ISA-95') },
        { label: 'NIST SP 800-207, Zero Trust Architecture', url: 'https://doi.org/10.6028/NIST.SP.800-207' },
        { label: 'NIST SP 800-161 Rev. 1, supply-chain risk management', url: 'https://doi.org/10.6028/NIST.SP.800-161r1' },
        { label: 'NIST SP 800-40 Rev. 4, patch management planning', url: 'https://doi.org/10.6028/NIST.SP.800-40r4' },
        { label: 'NIST SP 800-218 (SSDF), secure software development', url: 'https://doi.org/10.6028/NIST.SP.800-218' },
        { label: 'OWASP API Security Top 10 (2023)', url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/' },
        { label: 'NIST SP 800-57 Part 1 Rev. 5, key management', url: 'https://doi.org/10.6028/NIST.SP.800-57pt1r5' },
        { label: 'NIST SP 800-92, log management', url: 'https://doi.org/10.6028/NIST.SP.800-92' },
        { label: 'NIST SP 800-34 Rev. 1, business-impact analysis', url: 'https://doi.org/10.6028/NIST.SP.800-34r1' },
        { label: 'ISO 28000:2022, supply-chain security management', url: search('ISO 28000 2022') },
        { label: 'NIST SP 800-61 Rev. 3, incident response', url: 'https://doi.org/10.6028/NIST.SP.800-61r3' },
        { label: 'MITRE ATT&CK Enterprise matrix', url: 'https://attack.mitre.org/' },
        { label: 'MITRE ATT&CK for ICS matrix', url: 'https://attack.mitre.org/matrices/ics/' },
      ] },
    ],
  },

  erp: {
    blocks: [
      { h: 'Ransomware and Destructive Malware' },
      { p: `Ransomware is one of the most important Level 4 threats because business and logistics systems are often required for continued industrial operation. If an ERP, warehouse, maintenance or production-planning system becomes unavailable, operators may no longer know which products to manufacture, which materials are available, which equipment is safe to operate or where completed goods should be sent.` },
      { p: `The malware does not need to reach a PLC to stop production. Encryption of application servers, databases, virtual-machine infrastructure, identity services or shared storage can make continued operation unsafe or economically impossible. Colonial Pipeline demonstrated that compromise of business systems can lead to the shutdown of physical operations even without confirmed manipulation of the control network. NotPetya similarly demonstrated how shared credentials, vulnerable services and weak segmentation can allow destructive malware to spread rapidly through enterprise environments.` },
      { p: `In MITRE ATT&CK, encryption for disruption maps to Data Encrypted for Impact, T1486, and destructive deletion maps to Data Destruction, T1485. The operational consequence at the industrial level corresponds to Loss of Availability in ATT&CK for ICS. The principal controls are network segmentation, isolated and tested backups, endpoint protection, application allowlisting, restricted administrative privileges and rapid isolation of infected systems.` },

      { h: 'Backup and Recovery' },
      { p: `Critical Level 4 applications, databases, configuration files, integration definitions and encryption keys should be backed up. At least one backup copy should be isolated from ordinary production credentials and protected against modification or deletion by ransomware.` },
      { p: `Application-consistent backups are required for complex ERP and database platforms. Copying the virtual machine alone may not produce a recoverable application if transactions and databases are not in a consistent state.` },
      { p: `Restoration tests should include more than recovering individual files. The organization should verify that it can restore the database, application configuration, certificates, service accounts and external interfaces required to provide the complete business service.` },
      { p: `Recovery priorities should be based on business impact. For example, an organization may decide that warehouse dispatch and production scheduling must be restored before historical reporting. Recovery time objectives and recovery point objectives should be documented for each critical service.` },

      { h: 'Capital Investment: Immutable Backup and Disaster-Recovery Infrastructure' },
      { p: `Dedicated immutable backup storage, isolated recovery environments and replicated disaster-recovery infrastructure can reduce downtime following ransomware or infrastructure failure. Investment should be based on the business impact analysis. Systems that can stop production or shipment for several sites may justify higher availability and faster recovery than non-critical reporting applications.` },

      { h: 'Capital Investment: High Availability and Redundant Integration Services' },
      { p: `Critical ERP, WMS and integration services may require redundant servers, database clustering, alternative network paths and tested failover procedures. Redundancy does not protect against logical corruption or ransomware if the same malicious change is immediately replicated to every node. High availability must therefore be combined with isolated backups and monitoring.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Segment application servers, databases and VM infrastructure into separate zones',
        'Take application-consistent backups of ERP and database platforms',
        'Keep one immutable or offline backup copy isolated from production credentials',
        'Test full application restoration including interfaces and authentication',
        'Document RTO, RPO and restoration order for each critical service',
        'Combine high availability with isolated backups; replication is not backup',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'The 3-2-1 backup rule and immutable backups against ransomware', url: search('3-2-1 backup rule immutable backup ransomware') },
      ] },
    ],
  },

  planning: {
    blocks: [
      { h: 'Manipulation of Business Transactions and Master Data' },
      { p: `Level 4 attacks may target the integrity of business processes rather than the availability of systems. Examples include modifying production quantities, changing delivery destinations, creating false maintenance work orders, manipulating quality records, altering bills of material or changing supplier banking information. Deliberate alteration of stored or transmitted records maps to Data Manipulation, T1565, in MITRE ATT&CK.` },
      { p: `Such activity may appear legitimate at the network level because it uses an approved application and a valid user account. Conventional malware signatures may not detect it. High-impact transactions therefore require application-level logging, defined approval workflows and, where appropriate, separation of duties or dual authorization.` },
      { p: `For example, the user who creates a new supplier bank account should not be the same user who approves payment to that account. Similarly, a user who modifies inventory quantities should not be able to remove the corresponding audit record. These controls reduce both malicious insider risk and the effect of compromised accounts. A production planner releasing an unusually large order, or an account submitting transactions at an unusual time or rate, are exactly the kind of business-process anomalies covered under the Databases node's monitoring section.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Enable application-level logging for production-order and master-data changes',
        'Require approval workflows for high-impact transactions',
        'Separate creation and approval of supplier bank-account changes',
        'Prevent users who modify records from deleting the matching audit entries',
        'Alert on unusually large orders and off-hours transactions',
      ] },
    ],
  },

  maintenance: {
    blocks: [
      { h: 'Maintenance and Asset Management Risk' },
      { p: `Computerized maintenance management systems and enterprise asset management platforms hold work orders, equipment records and maintenance schedules that directly affect what operators believe is safe to run. A maintenance administrator can modify work orders or equipment records, so compromise of this account may affect physical operations without requiring direct access to an industrial protocol.` },
      { p: `As with other high-impact Level 4 roles, creation and approval of maintenance work should be separated between different users, and maintenance accounts should have permissions limited to their actual responsibilities rather than broad administrative access. See the Identity & Access node for the full separation-of-duties model that applies to this and other Level 4 applications.` },
      { p: `A maintenance account creating work orders for unrelated equipment is a representative example of a business-process anomaly worth alerting on. The Databases node's monitoring section covers this alongside the equivalent examples for warehouse, production and supplier transactions.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Separate creation and approval of maintenance work orders',
        'Limit maintenance-account permissions to actual responsibilities',
        'Alert on work orders created for unrelated equipment',
        'Review CMMS and asset-management role assignments periodically',
      ] },
    ],
  },

  logistics: {
    blocks: [
      { h: 'Warehouse and Logistics Endpoint Compromise' },
      { p: `Warehouse operations commonly use handheld scanners, rugged tablets, wireless terminals, label printers, print servers and automated storage interfaces. These devices are often treated as simple peripherals even though they may run general-purpose operating systems and connect directly to business applications.` },
      { p: `Unmanaged scanners, obsolete printer firmware and shared wireless credentials can provide an attacker with an internal foothold. Warehouse endpoints should therefore be included in the asset inventory, assigned to dedicated network segments and managed through centralized configuration where the devices support it. They should not share a network segment with critical Level 4 databases or servers.` },

      { h: 'Secure File Transfer and EDI' },
      { p: `Plain FTP and unencrypted email attachments should not be used for sensitive logistics or production information. Managed SFTP, HTTPS or another approved encrypted transfer mechanism should be used.` },
      { p: `Every external partner connection should have an identified internal owner, defined data scope and documented authentication method. Shared partner accounts should be replaced with individual or system-specific identities.` },
      { p: `Inbound files should be scanned for malware and validated against the expected file type and structure before they are processed automatically. A file named as a spreadsheet should not be trusted only because it arrived from a known supplier.` },
      { p: `Directories used for automated import should not permit execution of uploaded files. Processing services should run with the minimum permissions required and should not have administrative access to the host.` },

      { h: 'Warehouse Endpoint Hardening' },
      { p: `Handheld scanners, printers and warehouse terminals should be inventoried and placed on dedicated network segments. Default passwords and unnecessary services should be removed.` },
      { p: `Where supported, devices should use centralized mobile-device management, application allowlisting and certificate-based wireless access. Devices that cannot support modern security controls should be restricted through network segmentation and communication allowlists.` },
      { p: `Shared warehouse accounts should be avoided where individual authentication is operationally practical. If a shared terminal must be used, high-risk transactions should require individual re-authentication or supervisor approval.` },

      { h: 'Capital Investment: Managed File Transfer' },
      { p: `A managed file-transfer platform can replace informal FTP servers, shared folders and email-based exchange with partner-specific authentication, encryption, malware scanning, delivery confirmation and audit logging. The benefit is strongest where the organization exchanges large volumes of production, supplier or shipment data with external parties.` },

      { h: 'Capital Investment: Endpoint Management and Network Access Control' },
      { p: `Organizations with large numbers of warehouse and mobile devices may require enterprise mobile-device management and network access control. These systems can enforce approved configurations, certificates, supported software versions and device compliance before network access is granted. The return depends on the number of devices and the risk created by unmanaged endpoints. Small environments may achieve sufficient control through static segmentation and manual management.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Inventory warehouse scanners, printers and terminals; remove default passwords',
        'Place warehouse endpoints on dedicated segments away from critical databases',
        'Replace plain FTP and email exchange with SFTP, HTTPS or managed file transfer',
        'Assign every partner connection an owner, data scope and review date',
        'Scan and validate inbound partner files before automated processing',
        'Block execution of uploaded files in automated import directories',
        'Manage supported devices with MDM and allowlisting; segment the rest',
        'Require re-authentication or supervisor approval for high-risk actions on shared terminals',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Managed file transfer platforms', url: search('managed file transfer') },
        { label: 'Mobile device management (MDM)', url: search('mobile device management') },
        { label: 'Network access control (NAC)', url: search('network access control') },
        { label: 'Windows Defender Application Control (WDAC)', url: search('Windows Defender Application Control') },
      ] },
    ],
  },

  bizdb: {
    blocks: [
      { h: 'Application, API and Database Compromise' },
      { p: `Database compromise is especially serious because Level 4 databases contain production schedules, inventory records, supplier information, customer orders, maintenance histories and application credentials. Unauthorized modification may be more damaging than simple data theft because operators may continue working from information they incorrectly believe is trustworthy.` },

      { h: 'Secure System Configuration' },
      { p: `Servers, virtual machines, databases and middleware should be built from documented secure baselines. Unused services, default accounts, sample applications, unnecessary software and obsolete protocols should be removed.` },
      { p: `Local administrator rights should be limited. Administrative interfaces should be reachable only from approved management networks or bastion hosts. Default credentials must be changed before a system is connected to the production network.` },
      { p: `Application and operating-system configurations should be reviewed after major upgrades because security controls may be reset or new services may be enabled. Configuration changes should follow a documented change-management process including approval, testing and rollback procedures.` },

      { h: 'Patch and Vulnerability Management' },
      { p: `Level 4 systems generally permit more regular patching than the lower OT levels, although ERP and logistics platforms may still require careful testing because of application dependencies. The patch process should identify, prioritize, test, deploy and verify operating-system, database, middleware and application updates.` },
      { p: `Internet-facing systems, remote-access platforms and vulnerabilities known to be actively exploited should receive the highest priority. Patch decisions should consider both vulnerability severity and system exposure.` },
      { p: `Where an application cannot be patched immediately, compensating controls should be implemented. These may include network isolation, removal of internet exposure, restricted administrative access, application firewall rules or temporary disabling of the vulnerable function.` },
      { p: `Unsupported applications and operating systems should have a documented replacement or isolation plan. Continued operation without vendor support should be accepted only through a formal risk decision.` },

      { h: 'Database Hardening' },
      { p: `Databases should accept connections only from approved application and administration systems. Direct database access from ordinary user workstations should be prohibited unless a specific, documented business requirement exists.` },
      { p: `Database accounts should have permissions limited to the required schemas, tables and operations. A reporting account should normally have read-only access. An integration service that inserts shipment records should not automatically have permission to modify user accounts or erase audit data.` },
      { p: `Default accounts and sample databases should be removed. Administrative activity, schema changes, failed logins and access to sensitive tables should be logged.` },
      { p: `Production databases should not be copied into development or testing environments without approval and appropriate data masking. Test environments frequently receive weaker security controls and can become an indirect route to sensitive production information.` },

      { h: 'Secrets and Certificate Management' },
      { p: `Passwords, API keys, database connection strings, private keys and certificates should not be stored in source code, shared documents or unprotected script files.` },
      { p: `Where an existing secret-management facility is available, applications should retrieve credentials at runtime rather than embedding them in configuration files. Where a dedicated vault is not available, secrets should at minimum be stored using an operating-system or platform-provided protected storage with restricted file permissions.` },
      { p: `Keys and certificates should have identified owners and expiration dates. Expired or untrusted certificates should not be bypassed by disabling validation. Cryptographic keys should be generated, stored, rotated and retired according to defined key-management procedures.` },

      { h: 'Encryption and Data Protection' },
      { p: `Sensitive production, supplier, customer, pricing, inventory and maintenance information should be encrypted in transit. TLS should be used for web applications, APIs, database connections and file transfers where supported.` },
      { p: `Encryption at rest should be applied according to data sensitivity and platform capability. Database encryption does not replace access control, because an authenticated application or administrator may still read the decrypted data.` },
      { p: `Data exports should be controlled. Spreadsheets, reports and database extracts often copy sensitive information from a managed application into an unmanaged shared folder or user device. Export permission should therefore be limited, and large or unusual exports should be logged.` },
      { p: `Retention periods should be defined for orders, audit records, maintenance information and integration files. Data that is no longer required should be securely deleted rather than retained indefinitely.` },

      { h: 'Network Segmentation and Communication Allowlisting' },
      { p: `Level 4 should be divided into security zones rather than operated as one flat network. Separate zones may be created for application servers, databases, administrative systems, warehouse endpoints, external partner services, backup systems and integration infrastructure.` },
      { p: `Host and network firewalls should deny communication by default and allow only documented flows. For example, an ERP application server may connect to its database on a defined port, but employee workstations should not connect directly to the database. Warehouse scanners may connect to the WMS application service but should not reach the ERP database or administrative subnet.` },
      { p: `Communication with Level 3 should pass through the industrial DMZ. Only explicitly approved source and destination systems should be able to exchange data. Broad rules such as "Level 4 network to Level 3 network: allow" should be removed.` },
      { p: `Direct Level 4 access to Levels 2, 1 and 0 should be prohibited. If a business process appears to require direct communication with a controller, the design should be reviewed and replaced with an application or integration service at the appropriate intermediate level.` },
      { p: `Where practical, application proxies and message brokers should be used to terminate one connection and create a separate connection toward the destination. This prevents a single end-to-end session from crossing several security zones and allows messages to be inspected and validated.` },

      { h: 'Monitoring and Detection Infrastructure' },
      { p: `Level 4 monitoring should collect logs from identity services, operating systems, applications, databases, API gateways, firewalls, VPN services, managed file-transfer platforms and integration middleware. Log-management procedures should define collection, retention, review and protection against tampering.` },
      { p: `All systems should use synchronized time sources. Without consistent timestamps, it may be impossible to determine whether a suspicious login occurred before or after a database change or external file transfer. Logs should be retained centrally so that compromise of one server does not allow an attacker to erase the only record of their activity.` },
      { h: 'Native Application and Database Auditing' },
      { p: `Many ERP, WMS and database platforms already include audit functions. These should be enabled for high-risk activities rather than relying only on operating-system logs. Events of interest include:` },
      { list: [
        'Creation or deletion of users',
        'Changes to roles and permissions',
        'Modification of service accounts',
        'Changes to supplier or customer master data',
        'Inventory adjustments',
        'Production-order changes',
        'Shipment destination changes',
        'Maintenance-work-order changes',
        'Large report or database exports',
        'Creation of new integrations',
        'Failed API authentication',
        'Changes to audit configuration',
      ] },
      { p: `Audit logs should be reviewed by personnel independent of the users performing the transactions. An application administrator should not be the only person able to modify and review the audit records for their own actions.` },
      { h: 'Wazuh, Sysmon and Windows Event Forwarding' },
      { p: `The same monitoring tools used at Level 5, Windows Event Forwarding, Sysmon and Wazuh, can also be used for Windows-based Level 4 servers. Windows Event Forwarding and Sysmon can record authentication, process execution, service creation, PowerShell activity and changes to important files.` },
      { p: `Wazuh can centralize these events and provide alerts for suspicious administrator activity, unexpected executable files, disabled security services and changes to critical application directories. Deployment should begin with high-value systems such as ERP servers, integration platforms, database servers and administrative jump hosts.` },
      { p: `Automated response actions should be used carefully, or not at all. Automatically isolating a production-planning or warehouse server may interrupt operations. High-confidence alerts may justify automation, while other events should require analyst or service-owner approval.` },
      { h: 'Zeek and Suricata' },
      { p: `Zeek can monitor communication patterns between Level 4 zones and at the industrial DMZ boundary. It can identify new communication pairs, unusual DNS requests, unexpected protocols and large data transfers.` },
      { p: `Suricata can detect known exploits, malware communication and policy violations. It can also alert when protocols such as SMB, RDP or database traffic appear across a boundary where only HTTPS or managed file transfer is expected.` },
      { p: `These two tools reflect the same hybrid detection approach applied at Level 5: Suricata provides signature-based detection of known threats, while Zeek provides the behavioural and protocol context needed to recognize abnormal communication. They should initially operate in passive detection mode. Blocking should be introduced only after the required business flows are understood and tested.` },
      { h: 'Business-Process Anomaly Monitoring' },
      { p: `Security monitoring at Level 4 should include transaction context. An account may use a valid password and an approved application while performing actions that are operationally abnormal. Examples include:` },
      { list: [
        'A warehouse user modifying thousands of inventory records',
        'A maintenance account creating work orders for unrelated equipment',
        'A supplier bank account being changed shortly before payment',
        'A production planner releasing an unusually large order',
        'A user exporting the entire customer or supplier database',
        'An API submitting transactions at an unusual time or rate',
        'A partner connection sending a file format or data volume not previously observed',
      ] },
      { p: `Initial monitoring can use simple thresholds and reports rather than complex machine-learning systems. The objective is to identify high-consequence deviations that deserve review.` },
      { h: 'Integrity Monitoring' },
      { p: `File-integrity monitoring should be enabled for critical application configuration, scheduled scripts, integration mappings, web application files and security settings. A change does not automatically indicate an attack because legitimate updates also modify files. Integrity alerts should therefore be compared with approved change records. A change outside a maintenance window or without an associated change request should receive higher priority.` },
      { h: 'Monitoring Implementation Order' },
      { p: `A practical monitoring sequence is:` },
      { list: [
        'Enable native identity, application and database auditing',
        'Centralize high-value logs',
        'Deploy endpoint telemetry to critical servers',
        'Monitor the Level 4-to-DMZ boundary with Zeek or Suricata',
        'Create alerts for privileged and configuration changes',
        'Add alerts for high-risk business transactions',
        'Test the monitoring process through tabletop exercises and controlled simulations',
      ] },

      { h: 'Capital Investment: Database Activity Monitoring' },
      { p: `Database activity-monitoring platforms provide more detailed visibility into queries, administrative actions and sensitive-data access than ordinary operating-system monitoring. They can identify large exports, unusual query patterns and attempts to bypass the application layer. This control is most valuable for databases containing commercially sensitive or operationally important information. It should not replace database access control or native auditing.` },

      { h: 'Capital Investment: EDR and XDR' },
      { p: `Commercial EDR or XDR platforms can provide stronger behavioural detection and faster investigation of ransomware, credential theft and lateral movement. Automated containment should be tested carefully on systems supporting production and logistics. For critical servers, a policy that immediately terminates a suspicious process may be safer than one that disconnects the complete server from the network. Response actions should be agreed with the application owner and tested before enforcement.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Build servers, databases and middleware from documented secure baselines',
        'Change default credentials before any system joins the production network',
        'Restrict database connections to approved application and administration hosts',
        'Grant least-privilege database permissions; keep reporting accounts read-only',
        'Remove default accounts and sample databases',
        'Mask production data before copying it into test environments',
        'Store secrets in a vault, never in code or configuration files',
        'Enforce TLS for applications, APIs, database connections and file transfers',
        'Log large exports; define retention and secure deletion',
        'Patch by exposure: internet-facing and actively exploited vulnerabilities first',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Message broker / reverse proxy patterns for cross-zone termination', url: search('message broker reverse proxy') },
        { label: 'Windows Event Forwarding setup', url: search('Windows Event Forwarding setup') },
        { label: 'Sysmon, official Microsoft Sysinternals download', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon' },
        { label: 'Wazuh, open-source SIEM/XDR', url: 'https://wazuh.com' },
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'Database activity monitoring platforms', url: search('database activity monitoring') },
        { label: 'EDR vs XDR platform comparison', url: search('EDR XDR comparison') },
        { label: 'Secrets management vault', url: search('secrets management vault') },
      ] },
    ],
  },

  access: {
    blocks: [
      { h: 'Credential and Privilege Abuse' },
      { p: `Level 4 applications commonly contain powerful business roles. An ERP administrator may modify production orders and master data, a warehouse administrator may change inventory quantities and shipment releases, and a maintenance administrator may modify work orders or equipment records. Compromise of these accounts may therefore affect physical operations without requiring direct access to an industrial protocol.` },
      { p: `Shared accounts, excessive privileges and permanent administrator access make this risk more serious. Service accounts are particularly important because integration middleware, scheduled jobs, database connectors and file-transfer services often use long-lived credentials. These accounts may be excluded from ordinary password-expiration policies and may have access to several systems.` },
      { p: `The use of compromised credentials maps to Valid Accounts, T1078, in MITRE ATT&CK, with the equivalent technique T0859 in ATT&CK for ICS. Controls must therefore cover both human users and machine identities. Administrative, service and integration accounts should have separate purposes, limited permissions and identifiable owners.` },

      { h: 'Identity, Role and Privilege Management' },
      { p: `Multi-factor authentication should be required for privileged users, remote access, cloud administration and sensitive Level 4 applications. Phishing-resistant authentication should be preferred for administrators and users who can approve high-impact transactions.` },
      { p: `Applications should use role-based access control. Roles should correspond to actual business responsibilities such as production planner, maintenance planner, warehouse operator, database administrator and application administrator. Broad roles such as "power user" should be avoided unless their permissions are clearly documented.` },
      { p: `Separation of duties should be configured for high-risk business processes. Examples include:` },
      { list: [
        'Creation and approval of suppliers',
        'Modification and release of production orders',
        'Inventory adjustment and inventory approval',
        'Creation and approval of maintenance work',
        'Modification and approval of shipment destinations',
        'Application administration and audit-log review',
      ] },
      { p: `Privileged accounts should not be used for email, web browsing or ordinary business activity. Administrators should use a standard account for routine work and a separate account for administrative functions.` },
      { p: `Service accounts should be non-interactive unless interactive access is technically required. Each account should have a documented owner, purpose, dependent applications and permitted systems. Service-account credentials should not be shared between applications or reused across the Level 4 and Level 3 environments.` },

      { h: 'Capital Investment: Privileged Access Management' },
      { p: `A commercial PAM platform can vault and rotate administrative, database, service and integration credentials. It can also provide time-limited privilege and record administrative sessions. PAM is especially useful where many applications contain embedded service-account passwords or where external integrators require periodic administration. The platform should support emergency access and high availability so that its failure does not prevent urgent operational maintenance.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Enforce MFA for privileged users and sensitive Level 4 applications',
        'Prefer phishing-resistant authentication for transaction-approval roles',
        'Map application roles to actual business responsibilities',
        'Make service accounts non-interactive with documented owners',
        'Never reuse service credentials across the Level 4 and Level 3 environments',
        'Vault and rotate administrative and service credentials',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Privileged access management platforms', url: search('privileged access management') },
      ] },
    ],
  },

  integration: {
    blocks: [
      { h: 'Application, API and Database Compromise' },
      { p: `Level 4 contains web applications, APIs, databases and integration services that connect many parts of the organization. A vulnerability in one internet-facing or partner-facing application may therefore provide access to several internal systems.` },
      { p: `Common weaknesses include outdated application frameworks, weak authentication, missing authorization checks, SQL injection, insecure file upload, exposed administration interfaces, vulnerable third-party components and excessive API permissions. An attacker who compromises an API or integration server may be able to read sensitive information, submit fraudulent transactions or obtain credentials stored for downstream systems. Exploitation of an internet-facing or partner-facing application maps to Exploit Public-Facing Application, T1190.` },

      { h: 'Third-Party and Software Supply-Chain Compromise' },
      { p: `Level 4 systems depend heavily on software vendors, cloud providers, integrators, logistics partners, carriers and managed service providers. These parties may provide software updates, remote maintenance, data feeds, APIs or hosted services. A compromise of one supplier may therefore create access to several customers. This attack path maps to Supply Chain Compromise, T1195, in MITRE ATT&CK, including the compromise of software dependencies and update mechanisms (T1195.002).` },
      { p: `Cybersecurity supply-chain risk management should be included in procurement, implementation and maintenance activities. Contracts should define supported software versions, vulnerability notification, patch availability, remote-access requirements, incident notification and secure handling of organizational data. Software inventories and software bills of materials should be requested where practical, especially for critical applications and integration components.` },
      { p: `External logistics connections also require protection. EDI gateways, carrier portals, supplier APIs and managed file-transfer systems process information received from organizations that are outside the local security boundary. Partner data should therefore be treated as untrusted input even when it arrives through an established commercial relationship.` },

      { h: 'Lateral Movement Toward Level 3' },
      { p: `Attackers may search for dual-homed servers, shared Active Directory domains, historian connections, database links, remote administration tools or service accounts that work in both environments. This activity maps to Remote Services, T1021, and Lateral Tool Transfer, T1570, in MITRE ATT&CK, normally combined with the Valid Accounts technique described on the Identity & Access node.` },
      { p: `A Level 4 integration server may become a bridge if it has unrestricted interfaces on both sides of the industrial DMZ. The same problem occurs when a Level 4 administrator can directly open RDP or SSH sessions to a Level 3 server, or when an application stores credentials that provide access to operational systems.` },

      { h: 'Cloud and Service Dependency' },
      { p: `ERP, logistics, maintenance and analytics services are increasingly hosted in public or vendor-operated cloud environments. Cloud hosting does not remove the need for hardening. Identity configuration, API permissions, encryption, logging, backup responsibilities and incident notification must still be defined.` },
      { p: `The organization should understand which security responsibilities belong to the cloud provider and which remain with the customer. A provider may protect the physical infrastructure while the customer remains responsible for user access, application roles, data sharing and integration credentials. Critical processes should also have documented procedures for periods when the cloud service or internet connection is unavailable.` },

      { h: 'Application and API Security' },
      { p: `Custom applications, scripts, reports, plugins and integration components should follow secure development practices. Source code should be reviewed, third-party dependencies recorded and changes tested before deployment.` },
      { p: `Production code should not be modified directly on the application server. Development, test and production environments should be separated, and developers should not automatically possess production administrator rights.` },
      { p: `APIs should require authenticated access and enforce authorization for every function and data object. Authentication alone is insufficient if one authenticated user can access another organization's orders, inventory or administrative functions. Input validation, rate limiting, schema validation and secure error handling should be implemented according to the API risk categories documented by OWASP.` },
      { p: `Internet-facing and partner-facing APIs should be placed behind an approved reverse proxy or API gateway. Unused endpoints and old API versions should be disabled. API keys should have limited scope and defined expiration periods.` },

      { h: 'Partner and Supplier Connections' },
      { p: `Every supplier, carrier, customer or service-provider connection should have a named internal owner, documented purpose, approved protocol, defined data scope and review date.` },
      { p: `Partner identities should be specific to the organization or integration rather than shared between several external parties. Access should be removed when the commercial relationship ends.` },
      { p: `Inbound data should be authenticated and validated before processing. A trusted commercial relationship does not guarantee that the partner's systems have not been compromised.` },

      { h: 'Third-Party Security Requirements' },
      { p: `Software vendors and integrators should be required to maintain supported versions, provide vulnerability and patch information, protect development and update infrastructure and notify the organization of security incidents affecting the supplied service.` },
      { p: `Remote support should use individual accounts, MFA, approved devices and time-limited access through a bastion host. Permanent vendor VPN access to the complete Level 4 network should not be permitted.` },
      { p: `Where practical, contracts should address software bills of materials, subcontractors, data location, backup responsibilities, log availability, secure deletion and cooperation during incident investigation.` },

      { h: 'Capital Investment: Web Application Firewall and API Gateway' },
      { p: `Internet-facing and partner-facing applications may require a web application firewall to detect common web attacks and apply controls before requests reach the application. An API gateway can centralize authentication, rate limiting, schema validation, certificate management and logging for APIs used by suppliers, carriers and internal systems. These technologies do not correct insecure application logic, but they reduce exposure and provide a controlled enforcement point.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Separate development, test and production environments',
        'Review code and third-party dependencies before deployment',
        'Enforce authentication and per-object authorization on every API',
        'Apply input validation, rate limiting and schema validation per the OWASP API Top 10',
        'Place internet-facing and partner APIs behind a gateway or reverse proxy',
        'Disable unused endpoints and old API versions; give API keys limited scope and expiry',
        'Require SBOMs and vulnerability notification in vendor contracts',
        'Limit vendor remote support to MFA-protected, time-limited bastion access',
        'Document which cloud security responsibilities belong to the provider and which stay with you',
        'Prepare procedures for cloud-service and internet outages',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'API gateway platforms', url: search('API gateway') },
        { label: 'Web application firewall (WAF)', url: search('web application firewall') },
        { label: 'Software bill of materials (SBOM)', url: search('SBOM software bill of materials') },
        { label: 'OWASP API Security Top 10 (2023)', url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/' },
      ] },
    ],
  },
};
