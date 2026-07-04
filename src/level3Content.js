// Level 3 (Site Operations: historian, alarm and analytics servers) hardening
// guide content, keyed by diagram node id. 'l3' is the level-wide overview
// shown when the band label is clicked; the rest are per-component deep
// dives shown when a specific asset box is clicked. Mirrors the structure of
// level4Content.js and level5Content.js: operational data systems (Historian,
// Alarm & Analytics, OPC & Integration, Vendor & Remote Access) sit alongside
// the shared infrastructure tier that supports them (Domain Controller,
// Monitoring, Backup & Patch).
//
// Block shapes: { h } sub-heading, { p } paragraph, { list } bullet list,
// { links } a labeled list of external resources (real URLs where
// available, otherwise a search link built from the exact recommended
// search term).

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const LEVEL3_CONTENT = {
  l3: {
    blocks: [
      { h: 'Site Operations: Historian, Alarm and Analytics Servers' },
      { p: `Level 3 contains the systems used to coordinate and monitor operations across an industrial site. Typical assets include historians, alarm and event servers, production-reporting systems, batch-management services, analytics platforms, operations databases and supporting OT infrastructure such as authentication, backup, patch-management and file-transfer servers. The precise systems differ between sectors, but their common purpose is to convert data from the supervisory layer into information that can be used for plant-wide operational decisions.` },
      { p: `Level 3 is positioned between the business and logistics systems at Level 4 and the supervisory systems at Level 2. It therefore receives production requirements from above while collecting process data from below. This makes it one of the most important trust boundaries in the Purdue Model. A compromised Level 3 system may not directly operate a valve or motor, but it can alter production instructions, suppress alarms, manipulate historical data or provide an attacker with a trusted route toward HMIs, engineering workstations and controllers.` },
      { p: `The main hardening objective at Level 3 is to protect the integrity and availability of operational information while preventing Level 3 servers from becoming bridges between enterprise IT and the control environment. Controls must restrict which systems can communicate, which accounts can make changes and which applications are permitted to send information toward the supervisory and control layers.` },

      { h: 'Role of Level 3' },
      { p: `Level 3 supports site-wide manufacturing and operational management. While Level 4 is concerned with business planning, logistics, finance and enterprise resource management, Level 3 translates those requirements into plant-level activities. It may distribute production schedules, collect performance information, maintain operational records and provide data to maintenance, quality and engineering personnel.` },
      { p: `A plant historian is one of the most common Level 3 systems. It collects measurements, alarms and events from Level 2 and stores them for reporting, investigation and performance analysis. The historian may also replicate selected data to Level 4 for business reporting. Because it contains a detailed record of plant behaviour, its integrity is important. Manipulated historian data could hide an attack, mislead engineers or cause incorrect production decisions.` },
      { p: `Alarm-management servers collect and analyse alarms from HMIs, SCADA servers and other operational systems. They may be used to identify repeated alarms, nuisance alarms and abnormal process conditions. Unauthorized modification of alarm priorities, thresholds or suppression rules can reduce the operator's ability to recognize a dangerous condition.` },
      { p: `Analytics and production-reporting servers process operational data to calculate efficiency, equipment utilization, energy consumption, product quality and other performance indicators. Batch-management and recipe-coordination services may also be placed at this level. These systems can influence production even when they do not communicate directly with controllers, because operators and supervisory applications rely on their output.` },
      { p: `Level 3 may additionally contain services dedicated to the OT environment, including an OT directory service, update repository, antivirus-management server, backup server, network-management platform and secure file-transfer service. These systems should remain separated from their corporate equivalents where practical. A single shared management server with access to both enterprise and control networks can bypass the intended Purdue boundaries and create a high-value path for lateral movement.` },

      { h: 'Threat Landscape Summary' },
      { p: `The main Level 3 threat is compromise through a trusted connection. Level 3 systems frequently communicate with Level 4 applications, Level 2 servers, vendor-support platforms and other plant sites. Attackers can use these legitimate relationships to move from a compromised business environment toward the operational network.` },
      { p: `A representative attack path is: compromise of a Level 4 account or application → access to a trusted Level 3 interface → compromise of a historian, operations server or service account → discovery of Level 2 systems → movement through RDP, SMB, OPC, database connections or administrative tools → access to an HMI, SCADA server or engineering workstation.` },
      { p: `This attack path follows the staged movement described by the ICS Cyber Kill Chain. Attackers commonly establish an initial enterprise foothold before collecting credentials, learning the industrial environment and moving toward systems with operational access. The Ukraine power-grid attack demonstrated how access obtained in the enterprise environment could eventually be used to reach systems operated by control-room personnel.` },
      { p: `See the Historian, Alarm & Analytics, OPC & Integration, Vendor & Remote Access, Domain Controller, Monitoring and Backup & Patch nodes on this level for the specific techniques and controls addressing each part of this chain.` },

      { h: 'Incident Response and Recovery' },
      { p: `Incident response at Level 3 must be coordinated with operations. Immediately disconnecting a historian, alarm server or interface may affect operator awareness or production reporting. Before containment, the incident team should determine whether the affected system has write access toward Level 2 and whether its removal could disrupt the physical process.` },
      { p: `Where compromise is suspected, the organization should first block unnecessary write paths, terminate unauthorized remote sessions, disable affected accounts and preserve relevant logs. Operations may need to move temporarily to local Level 2 control, local historian storage or manual production and reporting procedures.` },
      { p: `Recovery should use known-good backups and installation media. Service-account passwords and certificates associated with the affected system should be replaced. Before reconnecting the system, the organization should verify application integrity, firewall rules, database permissions, OPC trust relationships and communication with Levels 2 and 4.` },
      { p: `Interfaces should be restored gradually. Read-only collection and monitoring should normally be restored before write-capable services. This allows the site to confirm that the rebuilt system behaves correctly before it regains the ability to influence supervisory systems.` },

      { h: 'Implementation Priorities' },
      { p: `Level 3 hardening should be implemented in the following order.` },
      { p: `The immediate priority is to identify every Level 3 asset and communication path. Direct Level 4-to-Level 2 connections, unrestricted internet access, shared administrator accounts and undocumented remote-access tools should be removed first.` },
      { p: `The second priority is to restrict access. Firewall rules should be reduced to required communication, service accounts should be reviewed, remote administration should be limited to approved management sources, the OT directory should be separated from the corporate directory, and Level 4 access to operational information should be read-only wherever possible.` },
      { p: `The third priority is recoverability. Historian, alarm, database and application backups should be scheduled, verified, protected from ordinary administrative accounts and tested through actual restoration.` },
      { p: `The fourth priority is monitoring. Authentication, configuration, database, application and network logs should be centralized; alerts should focus on changes to operational information and unexpected communication across Purdue boundaries; out-of-band notification should provide coverage outside working hours; and the monitoring system should itself be tested to confirm that alerts are still generated and received.` },
      { p: `The final priority is architectural improvement. Dedicated industrial firewalls, an industrial demilitarized zone, privileged-access management, redundant Level 3 services and unidirectional gateways should be introduced according to risk and available budget.` },
      { p: `Level 3 is the point where wide operational information, enterprise integration and access to supervisory systems meet. Hardening this level reduces the probability that a business-network intrusion will reach the control environment and limits the ability of an attacker to manipulate the information on which operators and engineers depend.` },

      { h: 'Resources' },
      { links: [
        { label: 'NIST SP 800-82 Rev. 3, OT security control baseline', url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final' },
        { label: 'IEC 62443 series', url: search('ISA IEC 62443 series') },
        { label: 'MITRE ATT&CK for ICS matrix', url: 'https://attack.mitre.org/matrices/ics/' },
        { label: 'ICS Cyber Kill Chain (Assante & Lee, SANS)', url: search('ICS Cyber Kill Chain Assante Lee SANS') },
        { label: 'NIST SP 800-161 Rev. 1, extending supply-chain control to OT software', url: 'https://doi.org/10.6028/NIST.SP.800-161r1' },
        { label: 'NIST SP 800-61 Rev. 3, incident response', url: 'https://doi.org/10.6028/NIST.SP.800-61r3' },
        { label: 'CISA Industrial Control Systems advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A93' },
        { label: 'Sector information-sharing centre (ISAC) directory', url: search('sector ISAC information sharing center') },
      ] },
    ],
  },

  historian: {
    blocks: [
      { h: 'Ransomware and Destructive Malware' },
      { p: `Many Level 3 systems use standard Windows and Linux operating systems and commercial databases. They are consequently exposed to ransomware and destructive malware that may not have been designed specifically for industrial systems. In MITRE ATT&CK for ICS, the encryption or deletion of operational data maps to Data Destruction (T0809) and results in Loss of Availability (T0826).` },
      { p: `Encryption or destruction of historian databases, alarm servers, batch records or production reports can interrupt operations even if the controllers remain functional. Operators may be unable to confirm process conditions, retrieve historical trends or verify product quality. Research into ransomware affecting industrial systems shows that loss of supporting operational services can create significant physical and economic consequences.` },

      { h: 'Historian and Database Protection' },
      { p: `Historian and operational databases should use separate accounts for data collection, reporting, replication and administration. Reporting users should normally receive read-only permissions. Database administration should be restricted to named administrators using controlled management systems.` },
      { p: `Changes to historian tags, retention rules, collection interfaces and replication jobs should require approval and should be logged. Read access should also be recorded where the platform supports it, so that the organization can see which accounts queried or exported operational data, not only which accounts changed it. Deletion of historical records should be restricted and exceptional. Where supported, audit records should be stored separately so that an attacker who compromises the application cannot easily remove the evidence.` },
      { p: `Connections from Level 4 should use replicated data or restricted database views rather than administrative access to the production historian. Database links, scheduled exports and application programming interfaces should be reviewed for excessive permissions.` },
    ],
  },

  alarm: {
    blocks: [
      { h: 'Manipulation of Operational Information' },
      { p: `An attacker does not need to shut down a Level 3 server to cause damage. More subtle attacks may change production records, delete historian data, suppress alarms, modify calculations or alter batch and recipe information. These actions map to Manipulation of View (T0832) and Alarm Suppression (T0878) in MITRE ATT&CK for ICS, where the information presented to operators no longer reflects the true state of the process.` },
      { p: `False information can be as dangerous as unavailable information. Engineers may make decisions based on manipulated trends, maintenance teams may receive incorrect equipment status and operators may fail to recognize abnormal behaviour. For this reason, integrity controls are as important as availability controls at Level 3.` },

      { h: 'Alarm and Analytics Protection' },
      { p: `Alarm priorities, limits, suppression rules and notification routes should be managed through formal change control. Changes should identify the person who requested them, the person who approved them, the time of implementation and the reason for the change.` },
      { p: `Permanent alarm suppression should not be used as a substitute for correcting a process or instrumentation problem. Temporary suppression should have a defined expiration time and should remain visible to operators.` },
      { p: `Analytics models and reporting calculations should also be protected from unauthorized modification. A compromised calculation may produce plausible but incorrect results. Important changes should therefore be version-controlled and tested against known operational data before deployment.` },
    ],
  },

  opc: {
    blocks: [
      { h: 'OPC and Application Interfaces' },
      { p: `OPC is widely used to exchange data between historians, SCADA systems and operational applications. Legacy OPC Classic depends on Windows DCOM and can require broad network permissions that are difficult to restrict. OPC Unified Architecture provides stronger security functions, including certificates, encryption and message signing, but insecure deployments may still allow anonymous access, weak security modes or excessive write permissions.` },
      { p: `PIPEDREAM demonstrated that attackers may target industrial communication and integration services, including OPC UA, rather than attacking only individual PLCs. OPC servers and gateways should therefore be treated as critical security boundaries rather than simple data-conversion services.` },

      { h: 'OPC Hardening' },
      { p: `OPC UA deployments should use signed and encrypted security modes. Anonymous access should be disabled unless it is explicitly required and shown to be low risk. Clients and servers should authenticate using approved certificates, and expired or untrusted certificates should be rejected.` },
      { p: `Certificate trust lists should contain only current and authorized systems. Private keys should be protected and certificate renewal should be planned before expiration. OPC users should receive read or write permissions according to their role, and read-only applications should not receive permission to modify process values.` },
      { p: `Unused OPC endpoints and insecure security policies should be disabled. Discovery services should not expose unnecessary information outside the approved Level 3 and Level 2 networks.` },
      { p: `Where OPC Classic remains necessary, DCOM permissions should be restricted to specific accounts and systems. Broad anonymous or network-wide DCOM permissions should not be used. Migration to OPC UA should be considered during future system upgrades, but legacy communication should first be contained through firewall rules and access restrictions.` },

      { h: 'Secure Integration' },
      { p: `Level 3 integrations should be treated as controlled conduits rather than general network connections. Each interface should have a documented purpose, owner, protocol, direction and permitted data type.` },
      { p: `Level 4 applications should exchange data with Level 3 through an industrial demilitarized zone, application proxy, replicated database, message broker or managed file-transfer service. Read-only access should be used whenever the business requirement does not require a response or control action.` },
      { p: `Level 3 should not be used as a transit route. A system should not forward arbitrary traffic between Level 4 and Level 2, and dual-homed servers should be removed where possible. Where an existing application requires connectivity to both sides, strict host-firewall rules, separate service accounts and detailed monitoring should be applied until the architecture can be redesigned.` },
      { p: `The software and updates installed on Level 3 systems are themselves part of the supply chain. The supply-chain controls that apply to Level 4 integration components, including supported-version requirements, vulnerability notification and software bills of materials, also apply to historian, OPC, analytics and security-management software at Level 3.` },

      { h: 'Resources' },
      { links: [
        { label: 'OPC Foundation, OPC UA security specifications', url: 'https://opcfoundation.org/security/' },
        { label: 'OPC UA security modes and hardening', url: search('OPC UA security modes hardening') },
      ] },
    ],
  },

  thirdparty: {
    blocks: [
      { h: 'Transient Devices, Vendor Activity and Supply Chain' },
      { p: `Vendor laptops, maintenance devices and temporary engineering systems may connect to Level 3 for software updates, troubleshooting or data collection. These devices may have previously been connected to less secure networks. Malware can therefore cross into Level 3 without passing through the normal network boundary. In MITRE ATT&CK for ICS, this corresponds to the Transient Cyber Asset (T0864) and Replication Through Removable Media (T0847) techniques.` },
      { p: `Vendor personnel may also receive broad or permanent remote access for convenience. A compromised vendor account or support platform can provide an attacker with an authenticated path into the site. Remote access should consequently be treated as an exceptional, monitored activity rather than a permanent extension of the Level 3 network.` },

      { h: 'Removable Media and File Transfer' },
      { p: `USB storage and other removable media should not be connected directly to Level 3 servers unless operationally required. Files entering the environment should pass through an approved transfer process that includes malware scanning, file-type validation and recording of the person, source and purpose of the transfer.` },
      { p: `Installation packages, scripts and configuration files should be checked against trusted hashes or digital signatures where available. Files should then be transferred to a controlled repository rather than copied independently to several servers.` },

      { h: 'Secure Remote Access' },
      { p: `Remote users and vendors should first authenticate to an approved VPN using MFA. They should then connect to a monitored jump host before reaching a specifically authorized Level 3 target. Access should be individually assigned, time-limited and disabled after the maintenance activity.` },
      { p: `Direct internet access to historians, OPC servers, alarm servers and operational databases should not be permitted. Vendor-installed remote-access software should be removed unless it forms part of the approved architecture. Remote sessions should be logged and, for privileged or vendor activity, recorded where possible.` },
      { p: `Emergency access procedures should be defined so that personnel do not create informal bypasses during an outage. Emergency access may use a faster approval process, but it should still require an individual account, MFA and retrospective review.` },

      { h: 'Resources' },
      { links: [
        { label: 'Managed file transfer platforms', url: search('managed file transfer') },
      ] },
    ],
  },

  dc: {
    blocks: [
      { h: 'Valid Accounts and Service Accounts' },
      { p: `Level 3 applications often use service accounts for historian collection, database access, scheduled tasks, backups, OPC communication and data replication. These accounts may have broad permissions and passwords that are rarely changed because modifications can interrupt production.` },
      { p: `If a service-account password is stolen, the attacker may appear to be a legitimate application. Shared administrator accounts create a similar problem because actions cannot be reliably attributed to one person. MITRE ATT&CK for ICS identifies Valid Accounts (T0859) as an important technique because it allows attackers to operate through normal authentication mechanisms and may avoid basic security controls.` },

      { h: 'Remote and Administrative Services' },
      { p: `RDP, SMB, PowerShell, Windows Management Instrumentation, SSH and commercial support tools are common on Level 3 servers. These services simplify administration but can also support discovery and lateral movement. MITRE ATT&CK for ICS describes Remote Services (T0886), Exploitation of Remote Services (T0866) and Lateral Tool Transfer (T0867) as techniques used to move through industrial environments.` },
      { p: `Level 3 servers should not be reachable through remote-administration protocols from general corporate workstations. An attacker controlling one Level 4 endpoint should not be able to begin an RDP or SMB session with a historian or alarm server.` },

      { h: 'Identity and Access Control' },
      { p: `Every user should have an individual account. Shared operator, administrator and vendor accounts should be removed unless a technical limitation makes them unavoidable. Administrative work should be performed using a separate privileged account rather than the user's ordinary account.` },
      { p: `Roles should be defined for operators, engineers, maintenance personnel, application administrators, database administrators, security personnel and vendors. Each role should receive only the permissions required for its responsibilities.` },
      { p: `Service accounts should be reviewed individually. They should be denied interactive login, RDP access and unnecessary local-administrator permissions. One service account should not be reused across unrelated applications. Passwords should be long, unique and stored through an approved credential-management process rather than embedded in scripts or configuration files.` },
      { p: `Multifactor authentication should be enabled for remote access, privileged administration and compatible Level 3 applications. Where an older application cannot support MFA directly, authentication can be enforced at a VPN, jump host or privileged-access gateway before the user reaches the application.` },
      { p: `The OT directory service should be separated from the corporate directory. Where Active Directory is used, the operational environment should have its own forest rather than being part of the corporate forest. There should be no trust relationship from the corporate domain into the OT domain, or at most a tightly controlled one-way trust. This separation ensures that compromise of the corporate domain does not automatically grant administrative rights in the control environment, which is one of the most common ways an enterprise intrusion reaches operational systems. OT directory administration should use accounts that exist only in the OT forest and are never used on corporate systems.` },

      { h: 'Capital Investment: Privileged Access Management' },
      { p: `Privileged-access management can protect administrator and vendor accounts. Useful functions include password vaulting, approval workflows, temporary privilege, session recording and automatic credential rotation.` },

      { h: 'Resources' },
      { links: [
        { label: 'Privileged access management platforms', url: search('privileged access management') },
        { label: 'Active Directory multi-forest / OT domain separation', url: search('Active Directory separate forest OT domain') },
        { label: 'Secrets management vault for service-account credentials', url: search('secrets management vault') },
      ] },
    ],
  },

  monitoring: {
    blocks: [
      { h: 'Compromise from Level 4' },
      { p: `Connections between Levels 4 and 3 commonly include production schedules, work orders, reports, historian replication, database queries and file transfers. Excessive firewall permissions may allow Level 4 systems to initiate connections to multiple Level 3 servers rather than using a small number of controlled interfaces.` },
      { p: `A compromised ERP, reporting server or administrative workstation may therefore be used to scan Level 3, attempt authentication or exploit vulnerable services. Direct communication from Level 4 to Level 2 is especially dangerous because it bypasses the security controls expected at Level 3 and the industrial demilitarized zone.` },

      { h: 'Network Segmentation' },
      { p: `Level 3 should be separated from both Level 4 and Level 2 by firewalls, as shown in the Purdue model. Communication should follow a deny-by-default policy in which only documented source systems, destination systems, ports and protocols are permitted.` },
      { p: `Level 4 systems should normally communicate with services in an industrial demilitarized zone rather than connecting directly to Level 3. Similarly, Level 3 systems should communicate only with the Level 2 systems required for their function. Direct Level 4-to-Level 2 communication should be prohibited.` },
      { p: `Historian replication is a common example. Instead of allowing a Level 4 reporting system to query the historian directly, selected data can be replicated to an intermediate historian or database in the industrial demilitarized zone. Where the business requires only operational information, the connection should be read-only from the perspective of Level 4.` },
      { p: `Level 3 servers should not have unrestricted internet access. Software updates and signatures should be obtained through a controlled repository or transferred through an approved process. Outbound connections should be limited to documented destinations because malware frequently uses outbound communication for command and control.` },
      { p: `Separate network segments should be considered for historians, alarm servers, operational applications, security-management services and administrative access. Segmentation within Level 3 reduces the possibility that compromise of one server provides unrestricted access to every other Level 3 asset.` },

      { h: 'Host Hardening' },
      { p: `Level 3 servers should run only the services required for their operational role. Unused web servers, database components, file-sharing services, remote-support agents and development tools should be disabled or removed.` },
      { p: `Host firewalls should permit connections only from approved systems. For example, a historian should accept collection traffic only from defined Level 2 data sources, database administration only from an approved management host and replication only toward a specified destination.` },
      { p: `RDP, SMB, PowerShell remoting, SSH and similar services should be disabled where they are not required. Where administration is necessary, connections should originate from a dedicated management subnet or jump host rather than the general Level 4 network.` },
      { p: `Application allowlisting is appropriate for many Level 3 servers because their installed software changes infrequently. The allowlist should cover executables, scripts, libraries and installers. Temporary exceptions should be documented and removed after maintenance.` },
      { p: `File-integrity monitoring should be enabled on critical system files, application binaries, configuration files, scripts and certificates. Because legitimate updates also change these files, integrity alerts should be compared against approved change records, and a change made outside a maintenance window or without a change request should be treated as higher priority.` },
      { p: `Default accounts should be disabled or renamed where supported. Local administrator membership should be reviewed, password policies should be enforced and audit logging should be enabled. Automatic screen locking and session timeouts should be configured for administrative consoles, while ensuring that operational displays are not interrupted.` },
      { p: `All Level 3 systems should use an approved internal time source. Consistent timestamps are necessary for correlating historian events, alarm activity, firewall logs and security alerts during an investigation.` },

      { h: 'Low-Cost Monitoring and Detection' },
      { p: `Level 3 provides a useful monitoring point because it contains both ordinary operating-system activity and industrially meaningful application activity. Security monitoring should combine host, network and application information rather than relying on one source.` },
      { p: `Windows Event Forwarding, Sysmon and an open-source platform such as Wazuh can collect authentication events, service creation, scheduled tasks, process execution, file-integrity changes and configuration changes from compatible Level 3 systems. These tools should first be tested to ensure that they do not affect application performance.` },
      { p: `Application and database auditing should record:` },
      { list: [
        'Successful and failed administrative logins',
        'Interactive login by service accounts',
        'Changes to historian tags or interfaces',
        'Read access to and exports of historian data',
        'Changes to alarm limits and suppression rules',
        'Modifications to batch, recipe or production data',
        'Creation or modification of database users',
        'Changes to replication jobs',
        'Backup failures and deletion attempts',
        'OPC certificate and trust-list changes',
        'Changes to application services and scheduled tasks',
      ] },
      { p: `Passive network monitoring can be implemented using tools such as Zeek and Suricata, already used at the other levels in this guide. Sensors should observe the boundaries between Level 4 and Level 3, between Level 3 and Level 2 and, where practical, important segments inside Level 3. This reflects the same hybrid detection approach used elsewhere in this guide, in which signature-based detection and behavioural traffic analysis are used together.` },
      { p: `Passive asset-discovery tools such as GRASSMARLIN can help map ICS topology without active scanning, but the project has been unmaintained since 2017. If it is used, it should run isolated from production networks and be checked against known vulnerabilities, or replaced with an actively maintained alternative.` },
      { p: `Monitoring should identify new devices, new communication pairs and protocols that do not match the documented baseline. Examples of suspicious activity include a Level 4 workstation initiating RDP to a historian, a service account authenticating interactively, a Level 3 analytics server sending control-related traffic toward Level 2 or an OPC client browsing large numbers of tags outside an engineering window.` },
      { p: `Traffic monitoring at this level should normally be passive. Aggressive vulnerability scanning can affect legacy services and should not be performed against production systems without testing and approval.` },
      { p: `Operational information can also support detection. The organization can compare production schedules, historian records, alarm events and Level 2 process data. A batch reported as complete while the expected process sequence did not occur may indicate a technical fault, configuration problem or deliberate manipulation.` },
      { p: `Detection is only useful if alerts reach someone who can act on them. Critical security and operational alerts should be delivered through a route that does not depend on a person watching a console, such as an automated message to an on-call phone or a notification system, so that incidents occurring outside normal working hours are not missed. Many sites do not operate a 24-hour security team, so out-of-band notification is often the difference between a contained incident and an unnoticed one.` },
      { p: `The monitoring system itself should be tested. The organization should periodically confirm that representative events still generate alerts, that those alerts still reach the intended recipients and that the alarm-management system itself is functioning. A monitoring rule that has silently stopped working provides false confidence and is, in practice, the same as having no monitoring at all.` },
      { p: `Alerts should be reviewed jointly by cybersecurity personnel and plant engineers. Security analysts may recognize unusual authentication behaviour, while engineers understand whether an operational command or data pattern is physically reasonable. This cooperation is necessary because not every unusual event is malicious and not every malicious action appears unusual to a conventional IT monitoring system.` },

      { h: 'Capital Investment: Industrial Firewalls and DMZ' },
      { p: `Industrial firewalls with application and protocol awareness can enforce more precise communication between Levels 3 and 2. Where supported, they can distinguish read operations from write operations and detect industrial protocol activity from unauthorized systems.` },
      { p: `A dedicated industrial demilitarized zone can host historian replicas, update repositories, remote-access gateways and file-transfer services. This removes the need for direct communication between business systems and production Level 3 servers.` },

      { h: 'Capital Investment: Unidirectional Gateways' },
      { p: `Unidirectional gateways or data diodes can be used where information must leave the operational environment but no return communication is required. Historian reporting is a common use case. A unidirectional connection provides stronger protection than a bidirectional firewall rule because an attacker at Level 4 cannot use the same path to send traffic back into Level 3.` },

      { h: 'Capital Investment: OT Network Detection and Response' },
      { p: `A dedicated OT network-detection and response platform can provide asset discovery, protocol analysis and detection rules designed for industrial environments. It should receive traffic from network taps or switch mirror ports and should not sit inline where its failure could interrupt production.` },

      { h: 'Capital Investment: Endpoint Detection and Response' },
      { p: `Endpoint detection and response may be deployed on compatible Level 3 servers after vendor approval and operational testing. Policies should be adapted to the stable nature of industrial applications so that legitimate software is not quarantined automatically during production.` },
      { p: `Capital investment should prioritize removal of direct trust paths and improvement of recoverability. Purchasing additional monitoring tools provides limited value while Level 3 remains flat, shared accounts remain active or backups cannot be restored.` },

      { h: 'Resources' },
      { links: [
        { label: 'Windows Defender Application Control (WDAC)', url: search('Windows Defender Application Control') },
        { label: 'Windows Event Forwarding setup', url: search('Windows Event Forwarding setup') },
        { label: 'Sysmon, official Microsoft Sysinternals download', url: 'https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon' },
        { label: 'Wazuh, open-source SIEM/XDR', url: 'https://wazuh.com' },
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'GRASSMARLIN, passive ICS topology mapping (unmaintained, isolate or replace)', url: 'https://github.com/nsacyber/GRASSMARLIN' },
        { label: 'Industrial (OT-aware) firewalls', url: search('industrial firewall OT protocol aware') },
        { label: 'Unidirectional gateways / data diodes', url: search('unidirectional gateway data diode ICS') },
        { label: 'OT network detection and response platforms', url: search('OT network detection and response') },
        { label: 'On-call alerting / paging for 24/7 coverage', url: search('on-call alerting paging') },
        { label: 'EDR vs XDR platform comparison', url: search('EDR XDR comparison') },
      ] },
    ],
  },

  backup: {
    blocks: [
      { h: 'Patch and Vulnerability Management' },
      { p: `Patching should be risk-based and coordinated with operations. Systems should not be updated automatically from the internet. Updates should first be reviewed for vendor compatibility, tested in a representative environment and installed during an approved maintenance window.` },
      { p: `Updates should be distributed from an internal repository rather than from the internet. A patch-management or update server inside the OT environment can mirror operating-system patches and antivirus signatures, and that server should itself be updated through a controlled, one-way process from a staging system rather than holding a permanent internet connection. This keeps Level 3 servers free of direct outbound internet access while still allowing them to be patched.` },
      { p: `Before patching, the organization should create a verified backup and document a rollback procedure. After installation, operational functions should be tested, including historian collection, OPC communication, alarm delivery, database replication and application authentication.` },
      { p: `Where a vulnerability cannot be patched, compensating controls should be applied. These may include firewall restrictions, disabling the affected service, application allowlisting, limiting access to a jump host or increasing monitoring around the vulnerable system.` },
      { p: `Patch priorities should be informed by current threat information. The organization should monitor the CISA ICS advisories, the security bulletins published by its automation and software vendors, and any relevant sector information-sharing centre (ISAC). New advisories for historian, OPC, database or remote-access products that are present at Level 3 should trigger a review of exposure and, where necessary, an out-of-cycle patch or compensating control.` },

      { h: 'Backup and Recovery' },
      { p: `Backups should be automated and run on a defined schedule rather than performed manually, and they should include operating-system configurations, application settings, historian databases, alarm configurations, scripts, certificates, licence information and installation media. A file-level backup alone may not be sufficient for a database-intensive Level 3 application.` },
      { p: `At least one backup copy should be offline or otherwise protected from alteration by ordinary domain and application accounts. Backup accounts should not be shared with production-service accounts.` },
      { p: `Restore tests should be performed periodically. A backup should not be considered reliable until the application has been restored and its operational interfaces have been tested. Recovery documentation should include the correct restoration order because databases, application services, interfaces and certificates may depend on one another.` },

      { h: 'Capital Investment: Redundant Level 3 Services' },
      { p: `Critical historian, alarm and operational services may require redundant servers, storage and network connections. High availability does not replace backups, but it can reduce disruption caused by ordinary hardware failure or the isolation of one compromised server.` },

      { h: 'Resources' },
      { links: [
        { label: 'NIST SP 800-40 Rev. 4, patch management planning', url: 'https://doi.org/10.6028/NIST.SP.800-40r4' },
        { label: 'Internal patch repository (WSUS offline or similar)', url: search('WSUS offline internal patch repository') },
        { label: 'Automation/software vendor PSIRT security advisories', url: search('vendor PSIRT security advisories') },
        { label: 'The 3-2-1 backup rule and immutable backups against ransomware', url: search('3-2-1 backup rule immutable backup ransomware') },
        { label: 'CISA Industrial Control Systems advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A93' },
      ] },
    ],
  },
};
