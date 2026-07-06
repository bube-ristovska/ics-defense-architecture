// Level 2 (Supervisory: HMI, SCADA, EWS) hardening guide content, keyed by
// diagram node id. 'l2' is the level-wide overview shown when the band label
// is clicked; the rest are per-component deep dives shown when a specific
// asset box is clicked. Mirrors the structure of level3Content.js,
// level4Content.js and level5Content.js: primary supervisory assets (HMI,
// SCADA Server, Engineering Workstation, Protocol Gateways) sit alongside
// the shared infrastructure tier that supports them (Access Control,
// Remote & Vendor Access, Monitoring, Backup & Patch).
//
// Block shapes: { h } sub-heading, { p } paragraph, { list } bullet list,
// { links } a labeled list of external resources (real URLs where
// available, otherwise a search link built from the exact recommended
// search term).

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const LEVEL2_CONTENT = {
  l2: {
    blocks: [
      { h: 'Supervisory: HMI, SCADA and Engineering Workstations' },
      { p: `Level 2 contains the systems through which operators supervise and interact with the industrial process. Typical assets include Human-Machine Interfaces (HMIs), SCADA servers, operator workstations, Engineering Workstations (EWSs), protocol gateways and communication servers. These systems receive process information from controllers at Level 1, display alarms and measurements, and allow authorized personnel to issue supervisory commands.` },
      { p: `Level 2 is one of the most security-sensitive parts of an Industrial Control System. An attacker who compromises an HMI or SCADA server may be able to change setpoints, start or stop equipment, suppress alarms or provide operators with false information. The compromise of an engineering workstation is more serious because it may allow modification of PLC logic, controller configuration and firmware.` },
      { p: `The main objective of Level 2 hardening is to ensure that only authorized users and systems can issue commands or make engineering changes. Level 2 must also remain available because operators depend on it for situational awareness and safe process supervision. Its protection requires segmentation, strict control of engineering functions, secure remote access, configuration management, monitoring and reliable recovery procedures.` },

      { h: 'Role of Level 2 in the Purdue Model' },
      { p: `Level 2 acts as the interface between human operators and the automated control functions performed at Level 1. PLCs and RTUs execute control logic and communicate with field devices, while Level 2 presents process information in a form that operators can understand and control.` },
      { p: `An HMI normally displays process values, equipment states, alarms, trends and control options. Depending on the operator's permissions, it may also allow commands such as starting a pump, opening a valve, changing a setpoint or acknowledging an alarm.` },
      { p: `A SCADA server collects data from PLCs, RTUs and other devices and distributes it to operator stations. It may manage alarms, maintain current process states and send supervisory commands toward controllers. In geographically distributed environments, the SCADA server may communicate with remote sites through protocol gateways or communication servers.` },
      { p: `The engineering workstation is used to create, modify, test and download controller programs. It may also configure HMIs, communication modules, protection devices, protocol gateways and safety-related settings. Unlike a normal operator station, an engineering workstation can make fundamental changes to the control system. It should therefore be treated as a privileged administrative system rather than as an ordinary workstation.` },
      { p: `Level 2 normally communicates upward with Level 3 historians, alarm servers and operational-management systems. It communicates downward with Level 1 controllers. These communication paths must be restricted because Level 2 should not become a general transit network between higher-level systems and the controllers.` },

      { h: 'Threat Landscape Summary' },
      { p: `The main Level 2 risk is that an attacker may use legitimate supervisory or engineering functions for malicious purposes. Industrial protocols often accept correctly formatted commands without being able to determine whether the person or application that generated them is trustworthy. Once an attacker controls an authorized HMI, SCADA server or engineering workstation, malicious commands may appear identical to normal operator activity. As at the other levels, the techniques below are mapped to MITRE ATT&CK for ICS, consistent with the rest of this guide.` },
      { p: `A representative Level 2 attack path is: compromise of a higher-level workstation or account → movement through Level 3 → access to an HMI, SCADA server or engineering workstation → use of trusted industrial protocols or engineering software → modification of controller behaviour → physical process impact.` },
      { p: `See the HMI, SCADA Server, Engineering Workstation, Protocol Gateways, Access Control, Remote & Vendor Access, Monitoring and Backup & Patch nodes on this level for the specific techniques and controls addressing each part of this chain.` },

      { h: 'Incident Response and Recovery' },
      { p: `Incident response at Level 2 must be coordinated with operations. Immediately switching off an HMI or SCADA server may remove the operator's ability to observe the process. When compromise is suspected, the response team should determine:` },
      { list: [
        'Whether unauthorized commands were issued',
        'Whether controller logic or firmware changed',
        'Whether alarms or displays were manipulated',
        'Whether the affected system has write access',
        'Whether another HMI can provide process visibility',
        'Whether the process can continue safely in local or manual mode',
        'Whether isolating the system could create a greater operational risk',
      ] },
      { p: `Initial containment may include disabling an affected account, terminating a remote session, blocking a write path, isolating the engineering workstation or placing the process into an approved safe operating state. The response team should preserve logs, engineering projects and other evidence where this can be done without endangering the process. Incident response procedures should be exercised jointly by cybersecurity personnel, operators and control engineers.` },
      { p: `Recovery should use known-good software, configurations and controller projects. Rebuilding the operating system alone is not sufficient. The organization should verify:` },
      { list: [
        'HMI and SCADA application integrity',
        'Controller project versions',
        'Controller firmware',
        'Communication-driver settings',
        'User and service accounts',
        'Certificates and trusted endpoints',
        'Alarm and setpoint configurations',
        'Firewall rules',
        'Remote-access settings',
        'Time synchronization',
      ] },
      { p: `Credentials and certificates associated with the compromised system should be replaced. Communication should be restored gradually, beginning with monitoring and read-only functions before write and engineering capabilities are re-enabled. After recovery, engineers should compare actual process behaviour with the expected operating state. An apparently successful technical restoration is incomplete if setpoints, alarm thresholds, HMI graphics or controller logic remain incorrect.` },

      { h: 'Implementation Priorities' },
      { p: `Level 2 hardening should be implemented in the following order.` },
      { p: `The first priority is to identify all Level 2 assets, users and controller communication paths. Unknown HMIs, engineering laptops, vendor connections and programming routes should be investigated.` },
      { p: `The second priority is to remove direct internet and corporate access. Remote access should pass through an approved gateway and jump host using MFA and individual accounts, and operator HMIs should have no remote access at all.` },
      { p: `The third priority is to protect engineering capability. Controller-programming traffic should be limited to approved engineering workstations, and engineering accounts should be separated from operator accounts.` },
      { p: `The fourth priority is to segment Level 2 by function and process area. Firewall rules should permit only required HMI, SCADA and controller communication.` },
      { p: `The fifth priority is to harden HMIs, SCADA servers and engineering workstations, including their physical access. Unnecessary applications, services, remote tools and administrative privileges should be removed, and consoles should be physically protected.` },
      { p: `The sixth priority is to protect controller projects, firmware and supervisory configurations through change control, approved repositories and verified backups.` },
      { p: `The seventh priority is to establish passive monitoring and high-confidence alerts for engineering downloads, controller mode changes, unusual write commands, remote sessions and alarm suppression.` },
      { p: `The final priority is to invest in protocol-aware firewalls, controlled remote-access infrastructure, privileged-access management, OT monitoring, recovery equipment and replacement of unsupported systems.` },
      { p: `Level 2 is where human decisions are translated into process commands. Its security therefore depends on ensuring that only authorized operators and engineers can use supervisory and engineering functions. Strong segmentation, restricted write access, protected and physically secured engineering workstations, controlled remote access, passive monitoring and verified recovery procedures significantly reduce the likelihood that compromise of an upper-level system will result in physical process manipulation.` },

      { h: 'Resources' },
      { links: [
        { label: 'NIST SP 800-82 Rev. 3, OT security control baseline', url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final' },
        { label: 'IEC 62443 series', url: search('ISA IEC 62443 series') },
        { label: 'MITRE ATT&CK for ICS matrix', url: 'https://attack.mitre.org/matrices/ics/' },
        { label: 'CISA Industrial Control Systems advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A93' },
      ] },
    ],
  },

  hmi: {
    blocks: [
      { h: 'Compromised HMI or Operator Account' },
      { p: `An attacker with access to an HMI may issue the same commands available to an operator. Depending on the process, this may include changing operating modes, modifying setpoints, stopping equipment, operating breakers or disabling alarms. These actions map to Unauthorized Command Message (T0855) and Modify Parameter (T0836) in MITRE ATT&CK for ICS.` },
      { p: `Shared operator accounts make these actions difficult to investigate because the system cannot identify the individual who performed a command. Stolen valid accounts (Valid Accounts, T0859) are especially dangerous because they may bypass basic authentication controls and appear to be legitimate activity.` },
      { p: `An attacker may also manipulate the information displayed to operators. False values, altered equipment states or suppressed alarms can cause incorrect operator decisions even when the attacker does not directly modify controller logic. This corresponds to Manipulation of View (T0832), Spoof Reporting Message (T0856) and Alarm Suppression (T0878).` },

      { h: 'HMI and Operator Workstation Hardening' },
      { p: `HMIs should be dedicated to process supervision. They should not be used for email, general web browsing, document editing or unrelated office activities.` },
      { p: `Unused operating-system services and applications should be disabled or removed. These may include unnecessary file sharing, print services, web servers, remote registry access, development utilities and consumer applications.` },
      { p: `Host firewalls should allow communication only with required SCADA servers, controllers, authentication services, time servers and management systems. An HMI should not accept remote administration from arbitrary Level 3 or corporate workstations, and operator HMIs should not accept remote-control sessions at all.` },
      { p: `Operators should not normally be able to exit the HMI application and access the desktop, command prompt or operating-system configuration. Kiosk functions or application restrictions should be used where supported.` },
      { p: `Alarm acknowledgements, setpoint changes, manual overrides and other important operator actions should be associated with an identifiable account and recorded in the application log.` },
      { p: `Automatic screen locking should be configured carefully. It should protect unattended engineering and administrative sessions without interfering with continuously attended operator consoles. Physical access restrictions and control-room procedures should support the technical controls.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Dedicate HMIs to process supervision; remove email, browsing and office use',
        'Remove or disable unused operating-system services and applications',
        'Restrict host firewalls to required SCADA, controller and management systems',
        'Disable remote-control sessions on operator HMIs entirely',
        'Lock operators into the HMI application with kiosk-style restrictions',
        'Tie operator commands and alarm actions to identifiable accounts and log them',
        'Configure screen locking that protects admin sessions without blinding operators',
      ] },
    ],
  },

  dcs: {
    blocks: [
      { h: 'Malware and Ransomware' },
      { p: `HMIs, SCADA servers and engineering workstations frequently run standard operating systems. They may therefore be affected by ransomware and other malware even when the malware was not designed specifically for ICS. In MITRE ATT&CK for ICS, this maps to Data Destruction (T0809) and Loss of Availability (T0826).` },
      { p: `Loss of Level 2 systems can remove operator visibility and prevent normal supervisory control. Operators may have to rely on local indicators or manual procedures while systems are restored. Research has shown that ransomware affecting industrial control environments can cause significant operational disruption without directly modifying the physical process.` },

      { h: 'SCADA Server Hardening' },
      { p: `SCADA servers should run only the applications and services required for their operational role. Development tools, internet browsers, email clients and unrelated database utilities should not be installed unless operationally necessary.` },
      { p: `SCADA service accounts should not have unnecessary domain, local-administrator or interactive-login privileges. Database accounts used by the SCADA application should receive only the permissions required by the application.` },
      { p: `Remote administration should be limited to approved management systems or jump hosts. RDP, SSH, SMB and other administrative protocols should be blocked from all other network sources.` },
      { p: `Configuration changes should follow formal change management. Changes to communication drivers, alarm definitions, user roles, controller addresses, graphics and tag databases should be approved, documented and backed up before implementation.` },
      { p: `Security controls should be tested to ensure that they do not interfere with alarm processing, controller communication or operator visibility.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Remove development tools, browsers and email clients from SCADA servers',
        'Strip unnecessary domain and local-administrator rights from SCADA service accounts',
        'Restrict remote administration to approved jump hosts; block RDP, SSH and SMB elsewhere',
        'Put drivers, alarm definitions, roles and tag databases under change management',
        'Back up the configuration before every change',
        'Test security controls against alarm processing and controller communication',
      ] },
    ],
  },

  ews: {
    blocks: [
      { h: 'Compromised Engineering Workstation' },
      { p: `The engineering workstation is normally the most powerful Level 2 asset. It may contain controller projects, device passwords, communication configurations, firmware files and vendor engineering software. Its compromise is described in MITRE ATT&CK for ICS as Engineering Workstation Compromise (T0818).` },
      { p: `Compromise of this workstation may allow an attacker to upload or download controller programs (Program Upload, T0845, and Program Download, T0843), perform online logic changes (Modify Program, T0889), infect stored project files (Project File Infection, T0873), stop or restart a controller (Device Restart/Shutdown, T0816), modify communications or install unauthorized firmware (System Firmware, T0857).` },
      { p: `Stuxnet demonstrated how trusted engineering software and controller-programming functions could be used to modify physical process behaviour while concealing the effects from operators. PIPEDREAM also demonstrated that attackers may target commonly used controller-programming platforms, OPC UA services and industrial protocols rather than relying only on conventional malware.` },

      { h: 'Supply-Chain and Vendor Compromise' },
      { p: `Level 2 depends heavily on vendor engineering software, protocol drivers, firmware packages and project files. A compromised software package, vendor laptop or engineering project may introduce malware or unauthorized changes.` },
      { p: `The risk is not limited to deliberate supply-chain attacks. Incorrect vendor configurations, outdated engineering software and uncontrolled maintenance activity can also weaken the environment. Vendor access and software transfers should therefore follow the same approval, restriction and monitoring requirements as internal engineering work.` },

      { h: 'Engineering Workstation Hardening' },
      { p: `The engineering workstation should be treated as the most privileged Level 2 system. It should be dedicated to engineering activity and should not be used for internet browsing, email or ordinary administrative work.` },
      { p: `Only the software required to configure installed controllers and supervisory systems should be present. Unused vendor tools, example projects, outdated protocol drivers and unnecessary utilities should be removed.` },
      { p: `The workstation should not maintain unrestricted permanent connections to every controller. Network access should be limited to devices the engineer is authorized to maintain. Where practical, controller-programming access should be enabled only during approved maintenance periods.` },
      { p: `Engineering project files should be stored in a controlled repository. Each production controller should have a clearly identified approved project version. Engineers should not rely on project copies stored only on individual workstations.` },
      { p: `Controller downloads, online logic edits, firmware updates and major configuration changes should require an approved change record. Before a download, the current controller program should be uploaded or otherwise backed up so that it can be restored if the change fails.` },
      { p: `Application allowlisting is suitable for engineering workstations because their required software changes infrequently. Only approved engineering applications, scripts, libraries and installers should be permitted to execute.` },
      { p: `Where separate engineering workstations are not available, the organization should at least use separate engineering accounts, restricted network rules and formal maintenance windows to distinguish engineering activity from normal operation.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Dedicate the engineering workstation to engineering; no browsing or email',
        'Remove unused vendor tools, sample projects and outdated drivers',
        'Limit network reach to controllers the engineer actually maintains',
        'Enable controller-programming access only during approved maintenance windows',
        'Store projects in a controlled repository with an approved version per controller',
        'Require change records for downloads, online edits and firmware updates',
        'Back up the running controller program before every download',
        'Apply application allowlisting to the engineering software set',
        'Verify vendor software and project files before use',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Windows Defender Application Control (WDAC)', url: search('Windows Defender Application Control') },
      ] },
    ],
  },

  gateway: {
    blocks: [
      { h: 'Insecure Industrial Protocols' },
      { p: `Many protocols used between Levels 2 and 1 were designed for trusted networks. Traditional Modbus, IEC 60870-5-104 and older DNP3 deployments may not provide strong authentication, encryption or command integrity. If an attacker reaches the network, they may be able to observe traffic, replay commands or send valid write requests (Unauthorized Command Message, T0855).` },
      { p: `Older Siemens S7 implementations and other proprietary controller protocols may expose programming, memory-writing or controller-control functions to systems with network access.` },
      { p: `OPC UA supports application authentication, user authentication, message signing, encryption and certificate-based trust. However, these functions must be configured correctly. Deployments that permit anonymous access, accept untrusted certificates or use insecure security modes remain exposed.` },
      { p: `Where secure protocol versions are available, such as DNP3 Secure Authentication, they can improve command authentication. However, many legacy devices do not support them, so segmentation and communication allowlisting remain necessary.` },

      { h: 'Industrial Protocol Hardening' },
      { p: `Secure protocol options should be enabled where supported by both endpoints.` },
      { p: `For OPC UA, signed and encrypted security modes should be used. Anonymous access and insecure endpoints should be disabled unless there is a documented operational requirement. Client and server certificates should be reviewed, and unknown or expired certificates should not be trusted automatically.` },
      { p: `OPC UA trust lists should contain only approved applications. Private keys should be protected, and certificate renewal should be planned before expiration. Users and applications that require only monitoring should receive read-only permissions.` },
      { p: `Where DNP3 Secure Authentication is supported, it should be used for important control commands. DNP3 implementations that cannot support secure authentication should be protected through segmentation and strict source allowlisting.` },
      { p: `Legacy protocols such as Modbus should be restricted to defined master-and-controller pairs. Systems that require only monitoring should not be permitted to send write function codes. Where protocol-aware filtering is available, high-risk operations such as writing coils, writing registers or restarting devices should be limited to authorized sources.` },
      { p: `Controller-programming protocols should be permitted only from approved engineering workstations. Operator HMIs should not receive upload, download, firmware or controller-mode-change access unless it is specifically required.` },

      { h: 'Capital Investment: Industrial Firewalls' },
      { p: `Industrial firewalls can be placed between process cells, between Levels 2 and 1 or in front of especially critical controllers. Protocol-aware models may be able to restrict specific industrial functions instead of allowing every command that uses an approved port.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Enable OPC UA signed and encrypted modes; disable anonymous endpoints',
        'Maintain OPC UA trust lists and plan certificate renewals',
        'Enable DNP3 Secure Authentication where both endpoints support it',
        'Restrict Modbus to defined master-and-controller pairs',
        'Block write function codes from monitoring-only systems',
        'Permit controller-programming protocols only from approved engineering workstations',
        'Filter high-risk operations with protocol-aware firewalls where available',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'OPC Foundation, OPC UA security specifications', url: 'https://opcfoundation.org/security/' },
        { label: 'DNP3 Secure Authentication', url: search('DNP3 Secure Authentication') },
        { label: 'Industrial (OT-aware, protocol-aware) firewalls', url: search('industrial firewall OT protocol aware') },
      ] },
    ],
  },

  accesscontrol: {
    blocks: [
      { h: 'Account and Privilege Management' },
      { p: `Every operator, engineer and administrator should use an individual account where the platform supports it. Shared accounts should be removed or limited to systems that cannot support individual identities.` },
      { p: `Operator accounts should be permitted to monitor the process and issue only the commands required for their role. They should not receive software-installation rights, operating-system administrator rights or controller-programming privileges.` },
      { p: `Engineering accounts should be separate from ordinary operator accounts. Engineers should use privileged accounts only when performing approved engineering work. Routine monitoring and nonprivileged work should be performed using a standard account.` },
      { p: `Administrative accounts should not be used to run SCADA services. Service accounts should be dedicated to one application, denied interactive login and given only the permissions required by that service.` },
      { p: `Default accounts and passwords should be changed. Unused accounts should be disabled, and vendor accounts should not remain permanently active after maintenance is complete.` },
      { p: `Passwords should be rotated on a defined schedule, and immediately when a person who knew them changes role or leaves, or when a vendor completes an engagement. Where a shared or service-account password cannot be tied to one individual, it should be changed after each vendor engagement and after any suspected exposure. Where supported, automated credential rotation reduces the operational burden of this requirement.` },
      { p: `Where supported, multifactor authentication should be enabled for remote access, privileged administration and engineering activity. When the HMI or engineering software cannot support MFA directly, it should be enforced at the remote-access gateway, VPN or jump host.` },

      { h: 'Physical Access Control' },
      { p: `Technical controls at Level 2 can be bypassed if an attacker, or an unauthorized insider, can physically reach a console. Physical and logical controls should therefore reinforce each other.` },
      { p: `Access to control rooms, equipment rooms and cabinets containing HMIs, SCADA servers and engineering workstations should be restricted to authorized personnel and recorded. Engineering workstations and servers should be kept in locked rooms or cabinets rather than left on an open plant floor.` },
      { p: `Unused physical ports, including USB, serial and network ports on Level 2 systems, should be disabled or physically blocked. A workstation that automatically logs in, has no screen lock and sits in an unlocked area is exposed regardless of its network configuration.` },
      { p: `Physical access by vendors and contractors should be authorized, escorted where appropriate and limited to the equipment and time period required for the approved work.` },

      { h: 'Capital Investment: Privileged Access Management' },
      { p: `Privileged-access management can protect engineering and administrator credentials. Useful functions include password vaulting, automatic credential rotation, approval before use and recording of privileged sessions.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Provide individual accounts for every operator, engineer and administrator',
        'Limit operator accounts to the commands their role requires',
        'Separate engineering accounts from operator accounts',
        'Dedicate service accounts per application and deny interactive login',
        'Change default credentials; disable unused and stale vendor accounts',
        'Rotate passwords on a schedule and after departures or vendor engagements',
        'Enforce MFA at the gateway, VPN or jump host where applications cannot',
        'Restrict and record access to control rooms and equipment cabinets',
        'Keep engineering workstations and servers in locked rooms or cabinets',
        'Disable or physically block unused USB, serial and network ports',
        'Authorize, escort and time-limit vendor physical access',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Privileged access management platforms', url: search('privileged access management') },
      ] },
    ],
  },

  remote: {
    blocks: [
      { h: 'Remote Access (Threat)' },
      { p: `Remote access tools are commonly used by engineers, vendors and system integrators. Poorly protected remote access can provide a direct path to Level 2. The risk is particularly high when remote-support software is permanently active, shared accounts are used or systems are directly reachable from the internet.` },
      { p: `MITRE ATT&CK for ICS describes External Remote Services (T0822), Internet Accessible Device (T0883), Remote Services (T0886) and Exploitation of Remote Services (T0866) as important techniques used against industrial environments.` },
      { p: `Level 2 systems should never be directly exposed to the public internet. Access through a VPN alone is also insufficient if a user can connect directly from an unmanaged laptop to an HMI or engineering workstation. Remote access should pass through controlled gateways, authentication services and monitored intermediate systems. Operator HMIs in particular should not be remotely accessible at all; remote access, where it is unavoidable, should be limited to engineering workstations through the controlled path described below.` },

      { h: 'Removable Media and Transient Devices' },
      { p: `Engineering files, firmware and software updates are often transferred through USB media or temporary maintenance laptops. These devices may previously have been connected to corporate, vendor or home networks and may introduce malware into the supervisory environment.` },
      { p: `MITRE ATT&CK for ICS describes Replication Through Removable Media (T0847) and Transient Cyber Asset (T0864) as entry paths into isolated or restricted industrial networks. The risk is increased when engineering workstations cannot access the internet and removable media becomes the normal method of transferring files.` },
      { p: `USB ports should be disabled where they are not needed. Where removable media is required, only approved media should be used. Files should be scanned on a separate inspection or transfer system before being introduced into Level 2. The transfer process should record the source, purpose, responsible person and destination.` },
      { p: `Firmware, engineering projects and installation files should be verified using trusted hashes or digital signatures where available. Software should be stored in an approved repository rather than downloaded directly from the internet using an engineering workstation.` },
      { p: `Vendor laptops should not connect directly to Level 2 without authorization. Their security status should be checked, and their access should be limited to required devices and the approved maintenance period.` },

      { h: 'Secure Remote Access' },
      { p: `Remote access to Level 2 should follow a controlled sequence: remote user → approved VPN or access gateway with MFA → industrial DMZ → monitored jump host → specifically authorized Level 2 asset.` },
      { p: `Remote users should not connect directly from the internet or from a corporate workstation to an HMI, SCADA server or engineering workstation. Operator HMIs should not be remotely accessible; remote access should be reserved for engineering and administrative tasks that genuinely require it, and should reach only the specific engineering workstation or server involved.` },
      { p: `Each employee and vendor should have an individual account. Access should be limited to required target systems and enabled only for the approved maintenance period. Permanent vendor access should be avoided.` },
      { p: `Remote sessions should be logged and, where practical, recorded. File transfer, clipboard use, drive redirection and local-device redirection should be disabled unless they are required for the maintenance activity.` },
      { p: `An internal employee should supervise high-risk vendor activities such as controller downloads, firmware changes and modifications to safety-related settings. Access should be removed when the work is complete.` },
      { p: `Emergency access procedures should be documented so that personnel do not create uncontrolled bypasses during an incident. Emergency access may use a faster approval process, but it should still require an individual identity, secure authentication and later review.` },

      { h: 'Capital Investment: Dedicated Remote-Access Gateway' },
      { p: `A dedicated remote-access gateway can provide MFA, approval workflows, session recording and temporary vendor access. This is preferable to maintaining several independent vendor remote-access products on Level 2 systems.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Route all remote access through VPN with MFA, the DMZ and a monitored jump host',
        'Prohibit direct internet or corporate connections to any Level 2 system',
        'Keep operator HMIs entirely non-remote',
        'Assign individual, time-limited accounts per employee and vendor',
        'Disable file transfer, clipboard and drive redirection by default',
        'Record sessions and supervise high-risk vendor work internally',
        'Disable unneeded USB ports; scan approved media on a transfer station',
        'Verify firmware and installers with hashes or signatures before use',
        'Document emergency access with individual identity, MFA and later review',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'OT-aware remote access platforms', url: search('OT remote access platform') },
        { label: 'Removable storage access control Group Policy', url: search('removable storage access control Group Policy') },
      ] },
    ],
  },

  netmon: {
    blocks: [
      { h: 'Asset and Communication Inventory' },
      { p: `The organization should maintain an inventory of all HMIs, SCADA servers, engineering workstations, gateways and supporting Level 2 devices. The inventory should include:` },
      { list: [
        'Device name and operational purpose',
        'Physical and network location',
        'Operating system and application version',
        'Connected controllers and process area',
        'Industrial protocols and ports',
        'User and service accounts',
        'Remote-access software',
        'Installed engineering tools',
        'Supported backup method',
        'Responsible system owner',
      ] },
      { p: `Communication between Levels 2 and 1 should also be documented. For each connection, the organization should know which system initiates communication, which controller it reaches, which protocol is used and whether the connection requires read, write or programming capability.` },
      { p: `Any undocumented communication path should be investigated before it is permitted to remain active. The asset and communication inventory should be updated after system changes and periodically compared with passive network observations.` },

      { h: 'Network Segmentation' },
      { p: `Level 2 should be separated from Level 3 through firewalls or equivalent security controls. Only required communication should be allowed. For example, a historian may need to collect information from a SCADA server, but it should not automatically receive RDP, SMB or engineering access to every Level 2 workstation.` },
      { p: `Direct access from corporate and business networks to Level 2 should be prohibited. Connections from Levels 4 and 5 should terminate in the industrial DMZ or pass through approved Level 3 services rather than reaching an HMI or engineering workstation directly.` },
      { p: `Where the architecture permits it, Level 2 should also be segmented by production area or control cell. An HMI responsible for one process area should not automatically communicate with controllers in unrelated areas.` },
      { p: `Engineering traffic should be more restricted than ordinary monitoring traffic. Only approved engineering workstations should be permitted to use controller-programming protocols. HMIs and historian interfaces should not receive programming permissions merely because they share the same network.` },
      { p: `Access to Safety Instrumented Systems should be separated from normal process-control access where possible. Engineering access to safety controllers should be limited to specifically authorized workstations and approved maintenance activities.` },
      { p: `Firewall policies should follow a deny-by-default approach. Rules should identify specific source and destination addresses, ports and protocols rather than allowing unrestricted communication between entire Level 2 and Level 1 networks.` },

      { h: 'Low-Cost Monitoring and Detection' },
      { p: `Level 2 monitoring should focus on changes that can affect the physical process. Passive monitoring is generally preferable because intrusive scans may disrupt older controllers or communication services.` },
      { p: `A passive sensor connected to a network tap or switch mirror port can observe communication between Levels 2 and 1 without sending traffic into the control network. Zeek and Suricata, already used at the other levels in this guide, can be used here where suitable protocol support and carefully tested rules are available, continuing the same hybrid detection approach.` },
      { p: `The initial objective should be to establish a baseline showing:` },
      { list: [
        'Which HMIs communicate with which controllers',
        'Which workstation performs engineering activity',
        'Which protocols and ports are used',
        'Which devices normally issue write commands',
        'When engineering traffic normally occurs',
        'Which connections cross the Level 2 boundary',
      ] },
      { p: `Alerts can then be generated when observed behaviour differs from the approved baseline. Active vulnerability scanning should not be performed against production Level 2 systems without testing and operational approval.` },
      { p: `Where supported, Level 2 systems should log successful and failed logins, administrative and engineering logins, operator commands, setpoint and operating-mode changes, alarm acknowledgements and suppressions, service installation or modification, remote-session creation, changes to users and roles, SCADA configuration changes, controller uploads and downloads, online logic edits, firmware updates, and controller start, stop or mode changes. Logs should be transferred to a protected Level 3 or security-monitoring system so that compromise of the local workstation does not allow an attacker to remove all evidence. Logging should be configured selectively, since excessive logging can consume storage or affect performance without producing useful alerts.` },
      { p: `Examples of useful Level 2 alerts include:` },
      { list: [
        'A new system beginning communication with a controller',
        'An HMI communicating with a controller outside its assigned process area',
        'Controller-programming traffic from a system other than the approved engineering workstation (Program Download, T0843)',
        'An engineering connection outside an approved maintenance window',
        'A controller project download or online edit (Modify Program, T0889)',
        'A controller changing from RUN to PROGRAM or STOP mode (Device Restart/Shutdown, T0816)',
        'Firmware being transferred to a controller (System Firmware, T0857)',
        'A read-only system beginning to issue write commands (Unauthorized Command Message, T0855)',
        'An unusual increase in write operations',
        'A critical alarm being disabled or suppressed (Alarm Suppression, T0878)',
        'A service account logging in interactively',
        'A new remote-access application being installed',
        'A vendor account being used outside an approved period',
        'A Level 2 system attempting internet communication',
      ] },
      { p: `These alerts combine network, host and process context. A valid industrial command may still be suspicious if it originates from the wrong device, occurs at the wrong time or affects a value outside its normal range.` },
      { p: `Known-good hashes or version records should be maintained for controller projects, HMI configurations, SCADA databases, scripts and firmware packages. Integrity checking should identify unexpected changes, but an alert should not automatically cause a production system to shut down. Engineers and operators should first determine whether the change was authorized and whether containment could affect process safety.` },
      { p: `Vendor-specific hardening and configuration tools may also be used where appropriate. For example, the PCS7 Hardening Tool can assist organizations using compatible Siemens environments, although its output should be reviewed and tested before changes are applied to production systems.` },

      { h: 'Capital Investment: OT Network Monitoring' },
      { p: `A commercial OT network-monitoring platform can provide industrial asset discovery, protocol decoding, baseline generation and alerts for controller changes. It should receive traffic passively and should not be installed inline where its failure could interrupt production.` },

      { h: 'Capital Investment: Endpoint Detection and Response' },
      { p: `Endpoint detection and response may be used on compatible SCADA servers, HMIs and engineering workstations after vendor approval and operational testing. Automatic containment should be configured carefully because isolating a supervisory system may remove operator visibility or control.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Separate Level 2 from Level 3 with deny-by-default firewall rules',
        'Prohibit direct corporate and Level 4 access to Level 2',
        'Segment Level 2 by production area or control cell',
        'Restrict controller-programming protocols to approved engineering workstations',
        'Separate Safety Instrumented System access from process-control access',
        'Deploy passive sensors on taps or mirror ports; avoid active scanning',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'Wazuh, open-source SIEM/XDR', url: 'https://wazuh.com' },
        { label: 'OT network detection and response platforms', url: search('OT network detection and response') },
        { label: 'EDR vs XDR platform comparison', url: search('EDR XDR comparison') },
      ] },
    ],
  },

  patchbackup: {
    blocks: [
      { h: 'Patch and Vulnerability Management' },
      { p: `Level 2 systems should not install updates automatically from the internet. Updates should be obtained from approved sources, reviewed for vendor compatibility and tested before deployment.` },
      { p: `Patching should occur during planned maintenance periods. Before an update, the organization should create a backup and document a rollback method. After installation, it should test controller communication, alarm processing, operator displays, historical data collection and engineering functions.` },
      { p: `Where an update cannot be applied, compensating controls should be used. These may include blocking the affected service, restricting the host to required communication, removing internet access, applying application allowlisting or increasing monitoring.` },
      { p: `Unsupported operating systems should be isolated as much as possible and should not be permitted to communicate with unnecessary systems. Their replacement should be included in the long-term modernization plan.` },

      { h: 'Time Synchronization' },
      { p: `HMIs, SCADA servers, engineering workstations, controllers and monitoring systems should use an approved internal time source. Accurate time is necessary for matching operator commands with alarms, controller events, network alerts and engineering changes. Level 2 systems should not connect directly to public internet time services.` },

      { h: 'Backup and Change Control' },
      { p: `Backups should include:` },
      { list: [
        'HMI and SCADA application configurations',
        'HMI graphics and tag databases',
        'Alarm configurations',
        'Controller project files',
        'Engineering workstation configurations',
        'Communication-driver and gateway settings',
        'Scripts and custom applications',
        'User and role configurations',
        'Certificates and trust stores',
        'Software installation packages',
        'Firmware versions',
        'Licence information',
      ] },
      { p: `At least one backup copy should be offline, immutable or otherwise protected from modification by ordinary Level 2 accounts. Backups should be tested by restoring them to spare hardware, a test environment or an offline workstation.` },
      { p: `The organization should be able to identify which project version is currently running in each controller. If the running logic and the approved repository version differ, the difference should be investigated.` },
      { p: `Controller logic, SCADA configurations and HMI projects should follow formal change control. The record should identify the requested change, approval, implementation time, responsible engineer, test results and rollback procedure.` },

      { h: 'Capital Investment: Dedicated Backup and Recovery Infrastructure' },
      { p: `Dedicated backup infrastructure can provide offline or immutable copies of SCADA configurations and engineering projects. Spare HMIs, engineering workstations or SCADA servers may also be justified where rapid recovery is required. Where older systems cannot be adequately protected, replacement should prioritize devices that are internet-accessible, unsupported, unable to restrict programming access or unable to recover from a verified backup.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Obtain updates from approved sources; never auto-update from the internet',
        'Test patches and document rollback before maintenance windows',
        'Verify controller communication, alarms and displays after patching',
        'Apply compensating controls where a system cannot be patched',
        'Isolate unsupported operating systems and plan their replacement',
        'Use one approved internal time source; never public NTP directly',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'The 3-2-1 backup rule and immutable backups against ransomware', url: search('3-2-1 backup rule immutable backup ransomware') },
        { label: 'Internal patch repository (WSUS offline or similar)', url: search('WSUS offline internal patch repository') },
      ] },
    ],
  },
};
