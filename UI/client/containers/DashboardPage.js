import React from 'react';
import blue from '@material-ui/core/colors/blue';
import InfoBox from '../components/dashboard/InfoBox';
import QuickAccess from '../components/dashboard/QuickAccess';
import ExtraSpace from '../components/dashboard/ExtraSpace';
import Pies from '../components/dashboard/Pies';
import PastQuery from '../components/dashboard/PastQuery';
import globalStyles from '../styles';
import Data from '../data';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    img: [],
  }
}
render() {
  const styles = {
    databox: {
      textAlign: 'center',
      margin: 'auto',
      width: '95%',
    },
  }
  return (
    <div>
      <h3 style={globalStyles.navigation}>Dashboard</h3>
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox       
                   color={blue[500]} 
                   title="Construct a Query" 
                   value=""  />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox
                   color={blue[500]}
                   title="Apollo Client Docs"
                   value=""
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox               
                   color={blue[500]}
                   title="Star us on Github"
                   value=""
          />
        </div>
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
          <InfoBox                  
                   color={blue[500]}
                   title="Report Bugs"
                   value=""
          />
        </div>
        <br>
        </br>
        <div style={styles.databox}>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
            <QuickAccess data={Data.dashBoardPage.quickAccess}/>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <ExtraSpace />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <PastQuery data={Data.dashBoardPage.pastQuery}/>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <Pies data={Data.dashBoardPage.Pies}/>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
 }
}

export default DashboardPage;
