module.exports = (props) =>
`<?xml version="1.0" encoding="UTF-8"?>
<ExtensionList>
  <Extension Id="${props.extensionBundleId}">
  <HostList>
  <!-- Comment Host tags according to the apps you want to support -->
  <!-- Photoshop -->
    <Host Name="PHXS" Port="8000" />    
  </HostList>
  </Extension>
</ExtensionList>`
