// Level 1 (Controllers: PLCs, RTUs) hardening guide content, keyed by
// diagram node id. 'l1' is the level-wide overview shown when the band label
// is clicked; the rest are per-component deep dives shown when a specific
// asset box is clicked. Mirrors the structure of the levels above: primary
// controller types (PLC/PAC, RTU, IED/Protection Relay, Safety Controller)
// sit alongside the shared infrastructure tier that supports them
// (Industrial Protocols, Engineering Access, Monitoring,
// Firmware & Recovery).
//
// Block shapes: { h } sub-heading, { p } paragraph, { list } bullet list,
// { links } a labeled list of external resources (real URLs where
// available, otherwise a search link built from the exact recommended
// search term).

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const LEVEL1_CONTENT = {
  l1: {
    blocks: [
      { h: 'Controllers: PLCs and RTUs' },
      { p: `Level 1 contains the devices that execute the automated control functions of an industrial process. Typical Level 1 assets include Programmable Logic Controllers (PLCs), Remote Terminal Units (RTUs), Programmable Automation Controllers (PACs), Intelligent Electronic Devices (IEDs), protection relays, drive controllers and safety controllers. These devices receive measurements from Level 0 sensors, execute control logic and send commands to actuators.` },
      { p: `Level 1 is the point at which digital instructions are directly translated into physical actions. A compromised Level 1 device may stop equipment, change operating sequences, alter protection settings, manipulate process values or prevent a system from entering a safe state. For this reason, Level 1 security must prioritize safety, deterministic operation, integrity of control logic and recovery from known-good configurations.` },
      { p: `Unlike ordinary computers, many controllers have limited processing power, long service lives and restricted security functions. Some cannot support endpoint protection, multifactor authentication or detailed logging. Hardening must therefore combine the security functions available on the device with segmentation, communication allowlisting, protected engineering access, physical security and monitoring at the surrounding network level.` },

      { h: 'Role of Level 1 in the Purdue Model' },
      { p: `Level 1 provides direct automated control over the physical process. It is positioned between Level 2 supervisory systems and Level 0 field devices.` },
      { p: `A PLC continuously reads input values from sensors, executes its control program and updates output values connected to actuators. The execution cycle may occur many times per second, which allows the controller to hold process variables such as pressure, temperature, flow, speed or voltage within their required limits.` },
      { p: `RTUs perform similar functions, particularly at geographically distributed or remote sites. They may collect field measurements, execute local control logic and communicate with a central SCADA system through radio, cellular, serial or IP-based connections.` },
      { p: `IEDs and protection relays are common in electrical systems. They measure electrical conditions and may automatically isolate faults, operate breakers or protect equipment. Drive controllers regulate motors and other rotating equipment, while PACs provide more advanced processing and communication functions than traditional PLCs.` },
      { p: `Safety controllers form part of a Safety Instrumented System (SIS). Their purpose is to detect dangerous process conditions and move the process to a safe state independently of the normal control system. Because these devices provide the final automated layer of protection against certain hazards, they should not be treated as ordinary process controllers.` },
      { p: `Level 1 normally communicates upward with HMIs, SCADA servers and engineering workstations at Level 2, and downward with sensors and actuators at Level 0. Communication with higher Purdue levels should not occur directly. Level 3, Level 4 and internet-based systems should not be able to initiate sessions with Level 1 controllers.` },

      { h: 'Threat Landscape Summary' },
      { p: `The main Level 1 threat is unauthorized use of legitimate controller capabilities. Attackers may not need to exploit a software vulnerability if they can reach a programming service, obtain valid engineering credentials or send unauthenticated industrial commands. As at the other levels, the techniques below are mapped to MITRE ATT&CK for ICS.` },
      { p: `A representative attack path is: compromise of a higher-level system → access to a Level 2 engineering workstation or programming service → connection to a Level 1 controller → modification of controller logic, firmware, operating mode or process values → physical process impact.` },
      { p: `See the PLC / PAC, RTU, IED / Protection Relay, Safety Controller, Industrial Protocols, Engineering Access, Monitoring and Firmware & Recovery nodes on this level for the specific techniques and controls addressing each part of this chain.` },

      { h: 'Incident Response and Recovery' },
      { p: `Incident response at Level 1 must begin with process safety. When controller compromise is suspected, the response team should determine:` },
      { list: [
        'What physical equipment the controller operates',
        'Whether the process is currently stable',
        'Whether controller outputs appear correct',
        'Whether safety systems remain available',
        'Whether logic, firmware or operating mode changed',
        'Whether another controller or manual method can maintain control',
        'Whether network isolation will interrupt essential communication',
        'Whether personnel can safely approach the equipment',
      ] },
      { p: `A controller should not be powered off or isolated automatically without understanding the physical consequences. Initial containment may include blocking programming traffic, disabling remote engineering access, removing an unauthorized engineering device, changing compromised credentials, placing a key switch in the protected operating position, isolating the affected control cell, moving the process to local or manual control, or executing an approved safe shutdown.` },
      { p: `The response team should preserve engineering logs, controller diagnostic information, network captures and copies of the running project where this can be done safely. For safety-controller incidents, functional-safety engineers must take part in containment and recovery, and the safety function cannot be assumed trustworthy merely because the controller remains operational.` },
      { p: `Recovery should use known-good controller projects, firmware and configuration information. Before restoration, the organization should verify the controller hardware model and revision, firmware and bootloader integrity, installed communication modules, network and protocol configuration, user accounts and passwords, controller operating mode, control logic, I/O mapping, safety and protection settings, and communication with authorized Level 2 systems.` },
      { p: `Where firmware compromise is suspected, replacing only the control logic is insufficient; the controller may need to be reimaged using trusted firmware or replaced with known-good hardware.` },
      { p: `After restoration, outputs should initially be placed in a safe or controlled state. Engineers should test inputs, outputs, interlocks, alarms and communication before the controller resumes full automatic operation. Communication should be restored gradually, with monitoring and read-only access restored before ordinary write commands, remote programming and vendor access. The restored system should be compared with the approved project and observed during the first production cycle; recovery is complete only after both technical integrity and correct physical process behaviour have been confirmed.` },

      { h: 'Implementation Priorities' },
      { list: [
        'Identify every controller, RTU, IED, protection relay and safety controller, including its firmware, connected process and authorized communication paths',
        'Remove direct internet and corporate connectivity; limit Level 1 communication to approved Level 2 systems and local control-cell devices',
        'Change default credentials, disable unused accounts and restrict programming access to approved engineering workstations',
        'Place controllers in the least permissive operating mode, using hardware keys, memory protection and write-protection functions where available',
        'Disable unused services, close unnecessary ports and limit industrial protocol functions to operational requirements',
        'Protect controller logic, firmware, I/O configuration and protection settings through formal change control and verified offline backups',
        'Separate safety controllers from the normal process-control environment and apply stricter authorization and monitoring to safety-system changes',
        'Establish passive network monitoring and alerts for programming operations, firmware changes, controller mode changes, forced outputs and unexpected communication',
        'Replace unsupported controllers and invest in protocol-aware firewalls, secure engineering gateways, modern secure controllers, spare equipment and representative test environments',
      ] },
      { p: `Level 1 devices directly control the physical process and therefore require stronger integrity protection than ordinary network endpoints. Their hardening depends on restricting programming access, protecting control logic, removing unnecessary connectivity, using secure operating modes, monitoring controller changes and maintaining tested recovery configurations. These controls reduce the probability that compromise of an upper Purdue level will result in direct manipulation of the industrial process.` },

      { h: 'Resources' },
      { links: [
        { label: 'NIST SP 800-82 Rev. 3, OT security control baseline', url: 'https://csrc.nist.gov/pubs/sp/800/82/r3/final' },
        { label: 'MITRE ATT&CK for ICS matrix', url: 'https://attack.mitre.org/matrices/ics/' },
        { label: 'CISA Industrial Control Systems advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A93' },
      ] },
    ],
  },

  plc: {
    blocks: [
      { h: 'Unauthorized Logic Modification' },
      { p: `Control logic defines how the controller responds to sensor inputs and how it operates connected equipment. An unauthorized logic change may alter a setpoint, disable an interlock, change an equipment sequence, force an output or introduce a hidden condition that activates later. In MITRE ATT&CK for ICS this maps to Modify Program (T0889) and Program Download (T0843).` },
      { p: `The change may be small and difficult to identify. An attacker does not need to replace the entire controller program; modifying one comparison value, timer, output address or safety condition may be enough to create a dangerous result.` },
      { p: `Stuxnet demonstrated how malicious code could use trusted engineering and controller-programming functions to modify PLC behaviour while attempting to conceal the changes from operators. Modern PLC security research similarly identifies control logic, firmware, runtime environments and communication interfaces as major attack targets.` },

      { h: 'Controller Mode Manipulation' },
      { p: `Many controllers support operating modes such as RUN, PROGRAM, REMOTE and STOP. Changing the mode can interrupt the process or enable programming functions that should not be available during normal operation. This maps to Change Operating Mode (T0858) and Device Restart/Shutdown (T0816).` },
      { p: `An attacker may place a controller into PROGRAM or STOP mode to halt execution, or into a remote-programmable state in order to download modified logic. Physical key switches and software mode controls reduce this risk only when they are used correctly; a key switch left permanently in REMOTE or PROGRAM mode provides little protection.` },

      { h: 'Firmware and Runtime Compromise' },
      { p: `Controller firmware manages communication, program execution, memory and device functions. Malicious or corrupted firmware may provide persistent access below the control-logic layer, and is described in MITRE ATT&CK for ICS as System Firmware (T0857); an attacker may also misuse a device's firmware-update state (Activate Firmware Update Mode, T0800).` },
      { p: `Firmware compromise is particularly serious because replacing the controller project may not remove the malicious modification. An attacker may also exploit a vulnerable runtime, communication service or embedded web interface to interrupt the controller or change its behaviour.` },
      { p: `PIPEDREAM demonstrated capabilities for interacting with industrial controllers and commonly used controller software. Such tooling shows that attacks may target controller platforms and their communication functions rather than only Windows-based systems. See the Firmware & Recovery node for firmware and vulnerability management controls.` },

      { h: 'Use Controller Operating Modes and Hardware Protection' },
      { p: `Controllers should remain in the least permissive operating mode required for normal operation. Where a physical key switch is available, the device should normally remain in RUN mode rather than REMOTE or PROGRAM mode, and the key should be removed and stored securely after an approved change.` },
      { p: `Remote programming should be enabled only when required. After engineering work is complete, the controller should be returned to its normal operating mode and the programming path should be closed.` },
      { p: `Memory-protection switches, write-protection functions and project passwords should be enabled where supported. These controls should not be the only defence, but they create an additional barrier against unauthorized changes.` },

      { h: 'Protect Controller Logic and Configuration' },
      { p: `Every controller should have an approved production project stored in a protected repository. The repository should contain source logic, the compiled controller project, hardware configuration, network configuration, I/O mapping, communication settings, safety logic, protection settings, device passwords or credential-recovery information, the firmware version, the required engineering-software version and documentation of dependencies.` },
      { p: `Changes should require a formal change record identifying the reason for the change, affected devices, responsible engineer, approval, planned implementation time, test procedure and rollback method. Before a change, the currently running project should be uploaded or otherwise verified against the approved repository; after the change, the new running version should be compared with the approved project.` },
      { p: `Online edits, forced values and temporary bypasses should be documented. Forces and bypasses should be removed after testing and reviewed before the system returns to normal operation.` },
      { p: `Project passwords and logic-protection features should be enabled where available. However, passwords should not prevent the asset owner from recovering or migrating the project: the organization must retain sufficient access to operate and restore its own equipment.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Keep controllers in RUN mode; remove and store key switches securely',
        'Enable remote programming only during approved maintenance windows',
        'Enable memory protection, write protection and project passwords',
        'Store approved production projects in a protected repository',
        'Require change records for downloads, online edits and firmware updates',
        'Verify the running project against the repository before and after changes',
        'Document and remove forces, online edits and temporary bypasses',
        'Retain owner access to password-protected projects',
      ] },
    ],
  },

  rtu: {
    blocks: [
      { h: 'Internet Exposure and Default Credentials' },
      { p: `A controller or gateway connected directly to the internet can be discovered through automated scanning (Internet Accessible Device, T0883). Many older devices use default credentials (Default Credentials, T0812), weak authentication or services that were never intended for untrusted networks.` },
      { p: `The compromise of internet-accessible Unitronics PLCs demonstrated that exposed controllers with weak or default credentials can be targeted across multiple organizations. Current government guidance continues to identify direct internet exposure and default passwords as two of the largest causes of OT compromise.` },
      { p: `Level 1 devices should therefore never be assigned directly reachable public addresses. Internet exposure should not be accepted merely because a controller is at a remote or unmanned site.` },

      { h: 'Remove Direct External Connectivity' },
      { p: `Level 1 devices should not communicate directly with the public internet, corporate IT systems or cloud services.` },
      { p: `Remote sites should use private addressing, managed communication gateways, VPNs or dedicated private connections. The controller itself should not terminate an internet-facing remote-access session where a separate secure gateway can be used.` },
      { p: `Default routes should be removed where they are not required. A controller that only communicates with devices in its local control cell may not need a gateway address at all. DNS, internet time services, cloud telemetry and automatic update connections should be disabled unless they are specifically required, documented and secured.` },
      { p: `Where a control cell can be fully isolated from other networks, that isolation should be used. However, a true air gap is rare and is frequently bridged by removable media, maintenance laptops and temporary connections. Isolation should therefore be treated as one control among several rather than a complete defence, and it does not remove the need for removable-media control, transient-device checks and monitoring.` },

      { h: 'Change Default Credentials' },
      { p: `Default passwords should be changed on every device that supports authentication, and passwords should be unique rather than reused across all controllers of the same model.` },
      { p: `Unused vendor, maintenance and diagnostic accounts should be disabled. If an account cannot be disabled, its password should be changed and access to the related service should be restricted through the network.` },
      { p: `Where controllers support individual accounts and roles, permissions should be separated between process monitoring, process operation, maintenance, logic programming, firmware management and security administration.` },
      { p: `Shared controller passwords may be unavoidable on legacy devices. In that case the password should be held in a controlled credential vault, access should require approval and the surrounding engineering session should be recorded. Controllers that cannot support strong authentication should be placed behind controls that can enforce it, such as an industrial firewall, engineering gateway or privileged-access system.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Remove public IP exposure from every controller and gateway',
        'Use private addressing, managed gateways or VPNs at remote sites',
        'Remove default routes, DNS and internet time where not required',
        'Change default credentials and make passwords unique per device',
        'Disable unused vendor and diagnostic accounts or restrict them via the network',
        'Vault shared legacy passwords with approval workflows and session recording',
        'Treat isolation as one control; keep controlling media and transient devices',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Secrets management vault for shared controller credentials', url: search('secrets management vault') },
      ] },
    ],
  },

  ied: {
    blocks: [
      { h: 'IEC 61850 Communication Security' },
      { p: `For IEC 61850 environments, management, engineering and protection communication should be separated where possible, and changes to IED settings and protection logic should require controlled engineering access.` },

      { h: 'Time Synchronization' },
      { p: `HMIs, SCADA servers, engineering workstations, controllers and monitoring systems should share a common, approved internal time source. Accurate time is necessary for correlating controller events, alarms, forced outputs, network alerts and engineering changes, and for the sequence-of-events records used in electrical systems.` },
      { p: `Level 1 devices should not synchronize directly from public internet time services. In IEC 61850 and other electrical environments, the protocol used for time distribution, such as PTP or IRIG-B, should itself be delivered from a trusted internal source and protected like any other control communication.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Separate management, engineering and protection communication',
        'Require controlled engineering access for IED and protection-setting changes',
        'Distribute time from a trusted internal source and protect PTP or IRIG-B',
        'Never synchronize Level 1 devices from public internet time services',
        'Alert on unexpected changes to protection-relay settings',
      ] },
    ],
  },

  safety: {
    blocks: [
      { h: 'Safety-System Compromise' },
      { p: `Safety controllers are designed to move the process into a safe state when dangerous conditions are detected. Compromising them can remove an important independent layer of protection, which MITRE ATT&CK for ICS describes as Loss of Safety (T0880).` },
      { p: `TRITON, also known as TRISIS, targeted safety controllers and demonstrated that attackers may attempt to modify the operation of a Safety Instrumented System. The malware was capable of communicating with and reprogramming targeted safety controllers. Safety controllers should therefore be separated from normal control networks and given more restrictive engineering access than ordinary process controllers.` },

      { h: 'Safety-Controller Hardening' },
      { p: `Safety Instrumented Systems should remain independent from the Basic Process Control System to the extent required by the process risk and safety design.` },
      { p: `Safety controllers should use separate engineering authorization, network paths and change procedures. Ordinary HMI and process-control accounts should not receive safety-programming permissions. Connections between the process-control network and the safety system should be limited to required status information, and write access from the normal control system into the safety controller should be avoided unless it is specifically required and justified by the safety design.` },
      { p: `Safety-logic changes should require additional review and approval. Each change should be validated against the Safety Requirements Specification and tested before the system is returned to service. Safety-controller key switches should remain in the protected operating position, engineering access should be disabled outside approved maintenance activities, and cabinets, programming ports and keys should be physically secured.` },
      { p: `Cybersecurity controls must not prevent the safety system from performing its required safety function. Changes should therefore be coordinated with functional-safety engineers and tested according to the safety lifecycle.` },

      { h: 'Capital Investment: Dedicated Safety-System Engineering' },
      { p: `Dedicated safety-system engineering workstations and physically separate safety networks reduce the possibility that compromise of the normal process-control environment reaches the Safety Instrumented System.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Keep the SIS independent from the BPCS to the extent the safety design requires',
        'Use separate engineering authorization, network paths and change procedures',
        'Deny safety-programming permissions to HMI and process-control accounts',
        'Limit BPCS-to-SIS connections to status information; avoid writes into the SIS',
        'Validate every safety-logic change against the Safety Requirements Specification',
        'Keep safety key switches protected; disable engineering outside maintenance',
        'Physically secure safety cabinets, programming ports and keys',
        'Coordinate all cybersecurity controls with functional-safety engineers',
      ] },
    ],
  },

  protocols: {
    blocks: [
      { h: 'Insecure Industrial Protocols' },
      { p: `Many Level 1 protocols were designed for environments in which every connected device was trusted. If an attacker reaches the controller network, the controller may accept a correctly formatted command without being able to verify whether it came from an authorized engineer or supervisory system. Possible actions include reading controller memory or process values, writing coils and registers, forcing inputs or outputs (Manipulate I/O Image, T0835), starting or stopping execution, uploading or downloading logic, changing protection settings, resetting the controller and modifying communication parameters. Sending such commands from an unauthorized source maps to Unauthorized Command Message (T0855).` },
      { p: `Secure protocol options should be enabled where they are supported. However, legacy controllers often cannot be upgraded to secure protocol versions, so their protection must depend on segmentation, source allowlisting and restriction of write and programming functions.` },

      { h: 'Denial of Service and Resource Exhaustion' },
      { p: `Controllers are built for predictable control workloads and may have limited processing capacity. Malformed packets, excessive connection requests, network loops or high traffic volumes may delay communication, restart the controller or interrupt its control cycle (Denial of Service, T0814; Block Command Message, T0803).` },
      { p: `An attack does not need to modify logic to affect the process. Preventing the controller from receiving inputs, sending outputs or communicating with the HMI may be enough to cause a shutdown or an unsafe operating condition. Security monitoring and scanning tools must also be deployed carefully, because aggressive active scanning can produce similar effects on fragile or older devices.` },

      { h: 'Segment Controllers by Control Function' },
      { p: `Level 1 networks should be divided into cells or zones, using VLANs and firewall rules, based on process function, criticality and safety impact.` },
      { p: `A controller operating one production line should not automatically communicate with controllers on another line. A compromise in one cell should not provide unrestricted access to the entire plant.` },
      { p: `Communication between Levels 2 and 1 should pass through industrial firewalls or access-control devices where practical, and rules should permit only documented communication between specific source and destination addresses. Programming protocols should be restricted more tightly than normal process communication: only approved engineering workstations should be permitted to use program upload, program download, firmware update or controller mode-control functions.` },
      { p: `Where protocol-aware filtering is available, the firewall should distinguish between read operations, ordinary process writes and engineering operations, and should block high-risk functions from systems that do not require them.` },

      { h: 'Disable Unused Services and Interfaces' },
      { p: `Controllers may provide web interfaces, FTP, Telnet, SNMP, discovery services, programming services, vendor diagnostic protocols and other management functions. Services that are not required should be disabled. If a service cannot be disabled on the controller, access should be blocked at the nearest switch or firewall.` },
      { p: `Insecure management services such as Telnet, unencrypted HTTP and older SNMP versions should be replaced with secure alternatives where supported, and embedded web interfaces should be limited to approved management systems.` },
      { p: `Unused switch ports should be disabled. Unused wireless, cellular, Bluetooth and USB interfaces should also be disabled where the controller supports this configuration.` },

      { h: 'Restrict Industrial Protocol Functions' },
      { p: `Communication should be limited to the minimum functions required for operation, and high-risk functions should be allowlisted per device rather than left open to any system on the network.` },
      { p: `For Modbus/TCP, communication should be limited to approved client-and-server pairs. Read-only systems should not be permitted to send write functions, and high-risk operations such as writing multiple registers, writing coils or performing diagnostics should be allowed only from authorized systems.` },
      { p: `For DNP3, Secure Authentication should be enabled where both endpoints support it; older implementations should be protected through segmentation and strict source allowlisting.` },
      { p: `For Siemens S7 and similar proprietary protocols, the strongest available access-protection and communication-security settings should be enabled, and programming access should be allowed only from approved engineering workstations.` },
      { p: `For EtherNet/IP, PROFINET and similar industrial Ethernet protocols, controller and engineering communication should be restricted to required network zones, and device-discovery and configuration protocols should not be permitted across unrelated segments.` },
      { p: `If a device supports authenticated and encrypted communication, it should be enabled after compatibility and performance testing. Secure protocols do not remove the need for segmentation, because configuration errors, stolen credentials and implementation vulnerabilities may still permit compromise.` },

      { h: 'Capital Investment: Industrial Firewalls' },
      { p: `Industrial firewalls can be placed in front of critical controller cells. Protocol-aware models can restrict programming operations and high-risk write functions rather than allowing every function carried over an approved port.` },

      { h: 'Capital Investment: Unidirectional Gateways' },
      { p: `Unidirectional gateways may be appropriate where controller data must leave a critical cell but no inbound communication is required. They are less suitable where supervisory commands or engineering access must travel in both directions.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Divide Level 1 into cells by process function, criticality and safety impact',
        'Firewall Level 2-to-1 traffic with documented source and destination pairs',
        'Restrict programming functions to approved engineering workstations',
        'Filter read, write and engineering operations where protocol-aware devices allow',
        'Disable web, FTP, Telnet, SNMP and other unused controller services',
        'Block services that cannot be disabled at the nearest switch or firewall',
        'Disable unused switch ports, wireless, cellular, Bluetooth and USB interfaces',
        'Limit Modbus to approved pairs; block writes from read-only systems',
        'Enable DNP3 Secure Authentication where both endpoints support it',
        'Enable the strongest S7 or proprietary access-protection settings available',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'DNP3 Secure Authentication', url: search('DNP3 Secure Authentication') },
        { label: 'Industrial (OT-aware, protocol-aware) firewalls', url: search('industrial firewall OT protocol aware') },
        { label: 'Unidirectional gateways / data diodes', url: search('unidirectional gateway data diode ICS') },
      ] },
    ],
  },

  engaccess: {
    blocks: [
      { h: 'Engineering Workstation and Maintenance-Device Compromise' },
      { p: `Controllers are normally programmed from engineering workstations or vendor maintenance laptops. A compromised engineering device (Engineering Workstation Compromise, T0818) may use authorized programming software and valid communication paths to modify Level 1 devices.` },
      { p: `Temporary laptops, calibration equipment and USB media may bypass normal network boundaries. MITRE ATT&CK for ICS describes Replication Through Removable Media (T0847) and Transient Cyber Asset (T0864) as important routes into industrial environments. The security of Level 1 therefore depends strongly on the security of the engineering systems authorized to access it.` },

      { h: 'Physical Access' },
      { p: `Many controllers include local USB, serial, memory-card or Ethernet interfaces. An individual with physical access may connect a programming device, replace a memory card, reset a password or change a hardware mode switch. Remote sites and unattended control cabinets are particularly exposed, because physical access can bypass network segmentation and remote-access controls.` },

      { h: 'Secure Engineering Access' },
      { p: `Level 1 controllers should not be accessed directly from corporate workstations, vendor networks or the internet. Remote engineering access should follow a controlled path: remote engineer → approved VPN or remote-access gateway with MFA → industrial DMZ → monitored Level 2 jump host or engineering workstation → specifically authorized Level 1 controller.` },
      { p: `The user should receive access only to the controllers required for the approved task. Programming access should be enabled for the maintenance period and disabled when the work is complete.` },
      { p: `Each engineering change should have an approved change record. High-risk activities, including firmware updates, safety-logic changes and protection-setting changes, should be supervised by an authorized internal engineer. Remote sessions should be recorded where practical, and file transfer, clipboard functions and device redirection should be disabled unless required. Project files transferred into the environment should be scanned and verified before use.` },

      { h: 'Capital Investment: Dedicated Engineering-Access Gateway' },
      { p: `Dedicated engineering-access gateways can ensure that controller programming occurs only through approved systems, providing MFA, credential vaulting, session recording and temporary authorization.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Program controllers only from approved engineering workstations',
        'Route remote engineering via VPN with MFA, the DMZ and a monitored jump host',
        'Enable programming access per maintenance period and disable it afterward',
        'Require approved change records for all engineering work',
        'Supervise firmware, safety-logic and protection changes internally',
        'Record remote sessions; disable file transfer and device redirection',
        'Scan and verify project files before they enter the environment',
        'Lock cabinets and control access to programming ports and memory cards',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'OT-aware remote access platforms', url: search('OT remote access platform') },
        { label: 'Privileged access management platforms', url: search('privileged access management') },
      ] },
    ],
  },

  ctrlmon: {
    blocks: [
      { h: 'Asset and Communication Inventory' },
      { p: `The organization should maintain an inventory of every PLC, RTU, PAC, IED, protection relay, drive controller and safety controller. For each device, the inventory should record:` },
      { list: [
        'Manufacturer and model',
        'Device name and operational function',
        'Physical location',
        'IP address and network segment',
        'Serial number and hardware revision',
        'Firmware and bootloader version',
        'Installed communication modules',
        'Enabled protocols and services',
        'Connected Level 2 systems',
        'Connected Level 0 inputs and outputs',
        'Controller operating mode',
        'Engineering software and project version',
        'Authentication and authorization capabilities',
        'Backup location',
        'Vendor support status',
        'Responsible engineer or asset owner',
      ] },
      { p: `The organization should also document which systems are permitted to read values, issue process commands, change configuration and program each controller. A normal HMI may need to read values and issue a limited set of process commands; it should not automatically receive firmware-update or program-download access. A historian may require read-only access and should not be able to write process values.` },
      { p: `Passive network observation can be used to compare actual communication with the documented inventory. Undocumented devices or communication relationships should be investigated.` },

      { h: 'Passive Network Monitoring' },
      { p: `Many controllers cannot run security agents, so Level 1 monitoring must rely mainly on network visibility, controller event information, project comparison and process behaviour.` },
      { p: `A passive monitoring sensor can observe Level 1 traffic through a network tap or switch mirror port without sending traffic to the controllers. The baseline should identify which Level 2 systems communicate with each controller, which engineering workstation is authorized to program each controller, which industrial protocols are used, which devices normally issue write commands, which functions are used during normal operation, when maintenance activity normally occurs and which controllers communicate with one another.` },
      { p: `Unexpected communication should generate an alert, for example a new workstation connecting to a controller, programming traffic from an HMI, communication between unrelated process cells or a controller attempting to reach the internet.` },
      { p: `Zeek and Suricata may be used at this level where they support the relevant protocols and have been tested safely, continuing the same hybrid detection approach used at the higher levels. Commercial OT-monitoring platforms are also suitable where budget allows.` },

      { h: 'Controller and Engineering Logs' },
      { p: `Where supported, controllers and engineering applications should log successful and failed authentication, program uploads and downloads, online logic edits, forced values and overrides, controller mode changes, firmware updates, configuration changes, device restarts, communication failures, time changes, user and role changes, and safety-function bypasses.` },
      { p: `Logs should be transferred to a protected Level 2 or Level 3 monitoring system. If a controller has limited storage, important events should be collected before they are overwritten. Engineering-workstation logs are especially important because they often provide more detail than the controller itself, recording which project was opened, which device was connected and whether a download occurred.` },

      { h: 'Logic and Configuration Comparison' },
      { p: `The running controller logic should be compared periodically with the approved repository version, using vendor engineering tools, controller checksums, project hashes or configuration-management platforms. The method should be tested, because some project files contain timestamps or metadata that change without altering the control logic.` },
      { p: `An unexpected difference should be investigated by an engineer. Automated systems should not overwrite controller logic or shut down the controller merely because a difference is detected. Safety-controller logic, protection-relay settings and critical interlock configurations should receive the highest priority.` },

      { h: 'High-Value Detection Rules' },
      { p: `Useful Level 1 alerts include:` },
      { list: [
        'A controller receiving programming traffic from an unauthorized source (Program Download, T0843)',
        'A project upload or download outside an approved maintenance window',
        'A controller changing from RUN to PROGRAM or STOP (Change Operating Mode, T0858)',
        'A firmware-transfer operation (System Firmware, T0857)',
        'A new device beginning communication with a controller',
        'An HMI beginning to use programming functions',
        'A read-only system issuing write commands (Unauthorized Command Message, T0855)',
        'Repeated failed controller authentication',
        'Use of a default or dormant account (Default Credentials, T0812)',
        'Activation of a previously unused service',
        'A safety bypass or forced output (Manipulate I/O Image, T0835)',
        'An unexpected controller restart (Device Restart/Shutdown, T0816)',
        'Loss of communication with several controllers at once (Denial of Service, T0814)',
        'A controller attempting external communication',
        'Unexpected changes to IED or protection-relay settings',
      ] },
      { p: `Alerts should be reviewed by cybersecurity personnel together with control and process engineers. A command may be technically valid but physically unsafe, while unusual process behaviour may reveal an attack that appears normal at the network level.` },

      { h: 'Process-Aware Monitoring' },
      { p: `Sensor values, controller states and actuator commands can be compared with expected physical behaviour. An alert may be generated when a pump is reported as stopped while flow remains high, a valve command changes without an expected process condition, two mutually exclusive outputs are active, a controller bypasses the expected operating sequence, a safety trip occurs without the corresponding process condition, or process values change in a way that is inconsistent with physical limits.` },
      { p: `Process-aware monitoring should initially operate in alert-only mode. Automatic response can create safety risks if the model is incomplete or an unusual but legitimate operating condition occurs.` },

      { h: 'Capital Investment: OT Network Monitoring' },
      { p: `Commercial OT-monitoring platforms may provide detailed protocol decoding, controller-change detection, firmware identification and integration with engineering tools. Monitoring should remain passive unless an active function has been tested and approved.` },
      { p: `Capital spending should first remove uncontrolled access and unsupported equipment. Expensive monitoring provides limited benefit if controllers remain internet-accessible, default credentials remain active or engineering workstations have unrestricted programming access.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Forward controller and engineering-workstation logs to protected monitoring',
        'Compare running logic against the approved repository on a schedule',
        'Investigate differences manually; never auto-overwrite controller logic',
        'Prioritize safety controllers and protection relays for comparison',
        'Baseline traffic passively; avoid active scanning of fragile devices',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'Zeek, network security monitoring', url: 'https://zeek.org' },
        { label: 'Suricata, signature-based IDS/IPS', url: 'https://suricata.io' },
        { label: 'OT network detection and response platforms', url: search('OT network detection and response') },
      ] },
    ],
  },

  fwbackup: {
    blocks: [
      { h: 'Firmware and Vulnerability Management' },
      { p: `Controller firmware should be included in the vulnerability-management process. The organization should monitor vendor advisories and CISA ICS advisories for the installed controller models and firmware versions, and assess vulnerabilities according to exploitability, network exposure, process criticality and possible safety impact.` },
      { p: `Firmware should not be installed from an unverified laptop or internet download. Packages should be obtained from an approved vendor source and checked using digital signatures or hashes where available. Updates should first be tested on spare hardware, a laboratory controller or a representative test system, confirming controller startup, execution of control logic, I/O operation, communication with Level 2, redundancy functions, safety functions and recovery or rollback.` },
      { p: `If firmware cannot be updated, compensating controls should be applied, such as disabling the vulnerable service, limiting communication to approved hosts, blocking high-risk protocol functions or replacing the affected communication module.` },
      { p: `When new controllers are purchased, preference should be given to products that provide secure boot, signed firmware, authenticated updates, role-based access, detailed logs, secure communication, clearly defined support periods and documented vulnerability-management processes.` },

      { h: 'Physical Hardening and Power Resilience' },
      { p: `Controllers should be installed in locked cabinets, panels or secure rooms, with access limited to authorized operations and maintenance personnel. Cabinets at remote sites should use locks, tamper indicators or access alarms where appropriate, and programming ports and removable memory cards should not be accessible without opening the secured enclosure.` },
      { p: `Keys used for controller mode switches should be controlled, because leaving a key in the switch makes the hardware protection ineffective. Unused network ports should be disabled, and exposed ports should sit inside protected cabinets where possible. Device labels should support maintenance without displaying passwords, addressing information or security details.` },
      { p: `Controllers, network equipment and safety systems should be supported by uninterruptible power supplies, and critical sites should have backup generators, so that a power disturbance does not cause an uncontrolled stop or remove protection. Where power cannot be maintained, the process should fail to a defined safe state rather than an unknown one.` },
      { p: `Decommissioned controllers and memory cards should be cleared before disposal or reuse, because they may contain logic, credentials, network information and intellectual property.` },

      { h: 'Backup and Recovery Preparation' },
      { p: `Backups should include more than the controller program. The organization should preserve everything required to rebuild the device: controller logic, hardware configuration, I/O configuration, network settings, firmware and bootloader versions, communication-module configuration, safety and protection settings, device certificates and keys where recoverable, engineering-software installation media, required licences, vendor documentation and password-recovery procedures.` },
      { p: `At least one copy should be offline or otherwise protected from alteration by ordinary engineering accounts. The organization should periodically confirm that the backup can be loaded onto compatible hardware; a backup is not fully verified until the restored controller has been tested against its expected I/O, communication and operating sequence.` },
      { p: `Spare controllers and communication modules should be stored with compatible firmware and documented configuration procedures. Long-term storage should account for battery condition, component obsolescence and licence availability.` },

      { h: 'Capital Investment: Modern Secure Controllers' },
      { p: `Modern controllers may provide secure boot, signed firmware, authenticated updates, role-based access, encrypted communication and improved security logging. Replacement should prioritize controllers that are directly exposed, unsupported, unable to protect programming functions or impossible to recover using verified backups.` },

      { h: 'Capital Investment: Redundancy, Power and Test Environments' },
      { p: `Redundant controllers, communication modules and power supplies can improve availability. Redundancy must not create an unmanaged security path, and both redundant units should use approved firmware and configuration. Uninterruptible power supplies and backup generators extend this resilience to the loss of site power.` },
      { p: `Offline test environments and spare controllers allow firmware, logic and security changes to be tested without affecting production. A representative Level 1 testbed is particularly valuable when the production process cannot tolerate active scanning or untested updates.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Track vendor and CISA advisories for installed controller models and firmware',
        'Obtain firmware from approved sources and verify signatures or hashes',
        'Test updates on spare hardware before production deployment',
        'Apply compensating controls where firmware cannot be updated',
        'Prefer secure-boot, signed-firmware controllers when purchasing',
        'Install controllers in locked cabinets with tamper indicators',
        'Control mode-switch keys; never leave keys inserted',
        'Back critical cabinets with UPS, and generators at critical sites',
        'Clear decommissioned controllers and memory cards before disposal',
        'Keep one offline backup of everything needed to rebuild each device',
        'Restore-test backups onto compatible hardware',
        'Stock spares with compatible firmware and documented procedures',
      ] },

      { h: 'Resources' },
      { links: [
        { label: 'CISA Industrial Control Systems advisories', url: 'https://www.cisa.gov/news-events/cybersecurity-advisories?f%5B0%5D=advisory_type%3A93' },
        { label: 'The 3-2-1 backup rule and immutable backups against ransomware', url: search('3-2-1 backup rule immutable backup ransomware') },
        { label: 'Uninterruptible power supply (UPS) sizing for control cabinets', url: search('UPS sizing industrial control cabinet') },
      ] },
    ],
  },
};
