import React from 'react';
import cyan from '@material-ui/core/colors/cyan';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ChevronRight from '@material-ui/icons/ChevronRight';
import GridOn from '@material-ui/icons/GridOn';
import Refresh from '@material-ui/icons/Refresh';
import Sentiment from '@material-ui/icons/SentimentSatisfied';
import Chart from '@material-ui/icons/InsertChartOutlined';


const data = {
  menus: [
    { text: 'Welcome', icon: <Sentiment/>, link: '/dashboard'},
    { text: 'DashBoard', icon: <GridOn/>, link: '/dashboard' },
    { text: 'Visualize Query', icon: <Chart/>, link: '/form' },
    { text: 'View Re-rendered Components', icon:<Refresh/>, link: '/table' },
  ],
  tablePage: {
    items: [
      {id: 1, name: 'Query 1', Schema: '-', category: 'Category 1'},
      {id: 2, name: 'Query 2', schema: '-', category: 'Category 2'},
      {id: 3, name: 'Query 3', schema: '-', category: 'Category 3'},
      {id: 4, name: 'Query 4', schema: '-', category: 'Category 4'},
      {id: 5, name: 'Query 5', schema: '-', category: 'Category 5'},
      {id: 6, name: 'Query 6', schema: '-', category: 'Category 6'},
      {id: 7, name: 'Query 7', schema: '-', category: 'Category 7'},
      {id: 8, name: 'Query 8', schema: '-', category: 'Category 8'}
    ]
  },
  dashBoardPage: {
    pastQuery: [
      {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
      {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
      {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
      {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'},
      {id: 5, title: 'asdfsdffsa', text: 'asdfsdfsdfsdfsdfsadf'}
    ],
    quickAccess: [
      {pv: 2400},
      {pv: 1398},
      {pv: 9800},
      {pv: 3908},
      {pv: 4800},
      {pv: 3490},
      {pv: 4300}
    ],
    Pies: [
      {name: 'Component One', value: 800, color: purple[400], icon: 'star'},
      {name: 'Component Two', value: 300, color: cyan[600], icon: <ChevronRight/>},
      {name: 'Component Three', value: 300, color: blue[700], icon: <ExpandLess/>}
    ]
  }
};

export default data;
