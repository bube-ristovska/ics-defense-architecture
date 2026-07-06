// Cross-cutting hardening controls that operate across the entire Purdue
// Model rather than belonging to one level: inventory, backup, and people.
// Surfaced through a standalone entry point in the app header rather than a
// diagram node, since it applies to every level from 5 down to 0.

export const CROSSCUTTING_CONTENT = {
  crosscutting: {
    blocks: [
      { h: 'Cross-Cutting Controls: Inventory, Backup and People' },
      { p: `The levels above identify controls specific to each layer of the Purdue Model. Several controls, however, must operate across the entire environment. The most important are an authoritative inventory, reliable backup and recovery, and personnel who understand both cybersecurity and the physical process.` },

      { h: 'Asset and Communication Inventory' },
      { p: `The organization should maintain one authoritative inventory covering Levels 5 to 0. It should include hardware, software, firmware, user and service accounts, network addresses, physical locations, responsible owners, vendor-support status and operational criticality. It should also record the permitted communication paths between systems.` },
      { p: `An asset list without communication information is incomplete. The organization must know which systems may communicate, which system initiates the connection, which protocols are required and whether the connection permits monitoring, control, administration or programming.` },
      { p: `The inventory should be maintained through a combination of passive discovery, firewall and switch records, engineering documentation, controller projects, software-management platforms and physical inspection. Changes should be reflected after installation, replacement, firmware updates and network modifications.` },

      { h: 'Backup, Recovery and Continuity' },
      { p: `Backups should cover the information required to restore both IT and OT functions. This includes business databases, historian data, HMI and SCADA configurations, controller logic, firmware, field-device parameters, certificates, user roles, firewall rules, licences and installation media.` },
      { p: `At least one backup copy should be offline, immutable or otherwise inaccessible to ordinary production accounts. Backup administrators and backup infrastructure should use separate credentials, so that compromise of the production environment does not automatically compromise the recovery copies.` },
      { p: `Backups must be tested through restoration. The test should confirm not only that files can be recovered, but also that applications start correctly, interfaces communicate, users can authenticate and the physical process behaves as expected. Recovery procedures should define the restoration order and identify which monitoring, read-only and control functions should be enabled first.` },
      { p: `Manual or degraded operating procedures should also be documented. These may be required when ERP systems, historians, HMIs, engineering workstations or remote communication services are unavailable.` },

      { h: 'People, Roles and Security Culture' },
      { p: `ICS security requires cooperation between cybersecurity personnel, control engineers, operators, maintenance teams, safety engineers, application owners and management. IT personnel may understand identity, endpoints and network security but not the physical consequences of a change. OT personnel understand the process but may not recognize credential theft, malware or lateral movement. Neither group can secure the environment independently.` },
      { p: `Responsibilities should be clearly assigned for asset ownership, account approval, firewall changes, patching, backups, vendor access, incident containment and restoration. High-risk changes should require approval from both the system owner and the responsible process or safety engineer.` },
      { p: `Training should be appropriate to each role. General employees need phishing and password-awareness training. Operators should recognize unexplained setpoint changes, unusual alarms and unauthorized remote activity. Engineers and maintenance personnel should understand the secure use of programming tools, removable media and vendor access. Incident-response teams should regularly exercise scenarios involving loss of visibility, controller compromise, ransomware and safety-system concerns.` },
      { p: `Third-party personnel should follow the same requirements as internal staff. Vendor access should use individual accounts, MFA, limited authorization, monitored sessions and defined expiration times, and should be removed when the work or contract ends.` },

      { h: 'Other Recurring Controls' },
      { p: `A small number of further controls recur at several levels and are applied wherever they are relevant rather than belonging to one layer. They are noted once here and detailed in the level and component where they matter most:` },
      { list: [
        'A separate OT directory held in its own Active Directory forest with no trust from the corporate domain',
        'An internal patch and update repository with no direct internet connection',
        'Threat-intelligence subscriptions such as the CISA ICS advisories, vendor PSIRTs and sector ISACs, used to drive patch priority',
        'Time synchronization from a trusted internal source rather than public services',
        'Centralized, tamper-protected logging with out-of-band 24/7 alerting and periodic testing that the alerts still fire',
        'Change management with approval, testing and a rollback plan for every significant change',
      ] },
      { p: `These cross-cutting controls create the foundation for the technical measures described at each Purdue level. Segmentation and monitoring are less effective when assets are unknown, recovery is impossible when configurations are not backed up, and procedures fail when personnel do not understand their responsibilities.` },

      { h: 'Hardening Checklist' },
      { list: [
        'Maintain one authoritative inventory covering Levels 5 through 0',
        'Record permitted communication paths, initiators and protocols',
        'Update the inventory after installs, replacements, firmware and network changes',
        'Keep one offline or immutable backup copy under separate credentials',
        'Test restoration end to end, including authentication and interfaces',
        'Document manual and degraded operating procedures',
        'Assign owners for accounts, firewall changes, patching, backups and vendor access',
        'Require dual approval (system owner plus process or safety engineer) for high-risk changes',
        'Deliver role-appropriate training and exercise incident scenarios regularly',
        'Hold third parties to internal requirements with expiring, monitored access',
      ] },
    ],
  },
};
