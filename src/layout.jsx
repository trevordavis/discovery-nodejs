import React from 'react';
import { Header, Jumbotron, Footer } from 'watson-react-components';
import Demo from './demo';

export default function Layout() {
  return (
    <div>
      <Header
        mainBreadcrumbs="CS89"
        mainBreadcrumbsUrl="http://localhost:3000"
        subBreadcrumbs="Watson Book Catalogue"
        subBreadcrumbsUrl="/"
      />
      <Jumbotron
        serviceName="Watson Book Catalogue"
        repository="https://github.com/watson-developer-cloud/discovery-nodejs"
        documentation="https://console.bluemix.net/docs/services/discovery/index.html"
        apiReference="http://www.ibm.com/watson/developercloud/discovery/api"
        startInBluemix="https://console.bluemix.net/registration?target=%2Fdeveloper%2Fwatson%2Fcreate-project%3Fservices%3Ddiscovery%26hideTours%3Dtrue&cm_mmc%3DOSocial_Tumblr-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmc%3DOSocial_Tumblr-_-Watson%2BCore_Watson%2BCore%2B-%2BPlatform-_-WW_WW-_-wdc-ref%26cm_mmca1%3D000000OF%26cm_mmca2%3D10000409"
        version="GA"
        description="Use Watson to find the books that match the themes and emotions you want in a story, with the world’s most advanced cloud-native insight engine."
      />
      <Demo />
      <div className="footer-container--div">
        <Footer />
      </div>
    </div>
  );
}
