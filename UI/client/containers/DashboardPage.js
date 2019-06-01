import React from 'react';
import blue from '@material-ui/core/colors/blue';
import InfoBox from '../components/dashboard/InfoBox';
// import QuickAccess from '../components/dashboard/QuickAccess';
// import ExtraSpace from '../components/dashboard/ExtraSpace';
// import Pies from '../components/dashboard/Pies';
// import PastQuery from '../components/dashboard/PastQuery';
import globalStyles from '../styles';
// import Data from '../data';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    img: [],
  }
}
render() {
  return (
    <div>
      <h3 style={globalStyles.navigation}>Dashboard</h3>
      <div className="row">

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox color={blue[600]} title="Construct a Query" value="" />
        </div>


        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
                   color={blue[600]}
                   title="Apollo Client Docs"
                   value=""
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
                   color={blue[600]}
                   title="Star us on Github"
                   value=""
          />
        </div>

        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox 
                   color={blue[600]}
                   title="Report Bugs"
                   value=""
          />
        </div>
      </div>

    </div>
  );
 }
}

export default DashboardPage;
