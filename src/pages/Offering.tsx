import * as React from 'react';

import { PriceInfo } from '../sections/offering/price-info';
import { InsuranceCoverage } from '../sections/offering/insurance-coverage';
import { TopBar } from '../sections/offering/top-bar';
import styled from 'react-emotion';

const Container = styled('div')({

});

export class Offering extends React.Component {

  render(){
    return(

      /*TODO: graphql data */
      <Container>

        {/* Top Bar */}
        <TopBar/>

        {/* Pice Info Section */}
        <PriceInfo
          alreadyInsured={false}
          header={"Min hemförsäkring"}
          subTitle={"Krukmakargatn 5"}
          price={"299 kr/mån"}
          subscriptionTime={"Ingen bindningstid"}
          startDate={"Startdatum:"}
          coverage={"Gäller i hela världen"}
          getInsured={"Bli försäkrad"}
          BackgroundImage={"url(assets/offering/map-background.png)"}
          iconClock={'/assets/offering/start-date.png'}
          iconWorld={'/assets/offering/world.png'}
          alreadyInsuredLabel={'Gamla försäkringens slutdatum'}
          todayLabel={'Idag'}
        />

        {/* Insurance Coverage Section */}
        <InsuranceCoverage
          headline={"Vad försäkringen täcker"}
          subTitle={"Klicka på ikonerna för mer info."}
        />

      </Container>
    );
  }

}

/* TODO: Add proptypes check */
