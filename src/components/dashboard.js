import React, { Component } from 'react'
import './dashboard.css';
import {Col, Row , Container} from 'react-bootstrap';
import WidgetText from './widgetText';
import Widgetbar from './widgetbar';
import Widgetpie from './widgetpie';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const config = {
    apiKey: 'AIzaSyDMu-Vw30ykPPmFT3cXeunzKEi4EahzglI',
    spreadsheetId: '1vcDPrMexD8bxNwwzK9IxF8wch6Hfezq2eooJACDiqgg'
}
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId
    }/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=${config.apiKey}`;

class dashboard extends Component {
    constructor(){
        super();
        this.state = {
            items: [],
            dropdownOptions: [],
            selectedValue: null,
            organicSource: null,
            directSource: null,
            referralSource:null,
            pageviews:null,
            newusers:null,
            users:null,
            sourceArr: [],
            usersArr: [],
        };
    }
    getData = arg => {
        const arr = this.state.items;
        const arrlen = arr.length;
        let organicSource = 0;
        let directSource = 0;
        let selectedValue = null;
        let referralSource = 0;
        let pageviews = 0;
        let newusers = 0;
        let users = 0;
        let sourceArr = [];
        let usersArr = [];
        
        for (let i = 0; i < arrlen; i++) {
            if (arg == arr[i]["month"]) {
                organicSource = arr[i].organic_source;
                directSource = arr[i].direct_source;
                referralSource = arr[i].referral_source;
                pageviews = arr[i].page_views;
                newusers = arr[i].new_users;
                users = arr[i].users;  
                sourceArr.push(
                {
                    label: "oraganic source",
                    value: arr[i].organic_source,
                }, {
                    label: "direct source",
                    value: arr[i].direct_source,
                }, {
                    label: "referral source",
                    value: arr[i].referral_source,
                })
                usersArr.push(
                    {
                        label: "Users",
                        value: arr[i].users,
                    }, {
                        label: "New users",
                        value: arr[i].new_users,
                    });
            }
        }
        selectedValue = arg;

        this.setState({
            organicSource: organicSource,
            directSource: directSource,
            referralSource: referralSource,
            pageviews: pageviews,
            users: users,
            newusers: newusers,
            sourceArr: sourceArr,
            usersArr: usersArr,
        });

    }
    updateDashboard = event => {
        this.getData(event.value);
        this.setState({ selectedValue: event.value },() => {
            console.log(this.state.organicSource);
        });
    }
    componentDidMount() {
        fetch(url)
        .then(response => response.json())
        .then(data => {

            let batchRowValues = data.valueRanges[0].values;

            const rows = [];

            for (let i = 1; i < batchRowValues.length; i++) {
                let rowObject = {};
                for (let j = 0; j < batchRowValues[i].length; j++) {
                    rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
                }
                rows.push(rowObject);
            }
            let dropdownOptions = [];

                for (let i = 0; i < rows.length; i++) {
                    dropdownOptions.push(rows[i].month);
                }

                dropdownOptions = Array.from(new Set(dropdownOptions)).reverse();
                this.setState(
                    {
                        items: rows,
                        dropdownOptions: dropdownOptions,
                        selectedValue: "Jan 2018"
                    },
                    () => this.getData("Jan 2018")
                );
        });
    }
    
    render() {
        const chartData = [
            {
              label: "Venezuela",
              value: "290"
            },
            {
              label: "Saudi",
              value: "260"
            },
            {
              label: "Canada",
              value: "180"
            },
            {
              label: "Iran",
              value: "140"
            },
            {
              label: "Russia",
              value: "115"
            }
          ];
          // Create a JSON object to store the chart configurations
        return (
             <div>
                  <Container>
                    <Row className="TopHeader">
                        <Col>Dashboard</Col>
                        <Col className="Dropdown-root"><Dropdown options={this.state.dropdownOptions} onChange={this.updateDashboard} value={this.state.selectedValue} placeholder="Select an option" /></Col>
                    </Row>
                </Container>
                <Container>
                    <Row className="mainDashboard">
                    <Col><WidgetText title="Organic Source" value={this.state.organicSource} /></Col>
                    <Col><WidgetText title="Direct Source" value={this.state.directSource} /></Col>
                    <Col><WidgetText title="Referral Source" value={this.state.referralSource} /></Col>
                    <Col><WidgetText title="Page views" value={this.state.pageviews} /></Col>
                    <Col><WidgetText title="New Users" value={this.state.newusers} /></Col>
                    <Col><WidgetText title="Users" value={this.state.users} /></Col>
                    <Col><Widgetbar title="Source comparision" data={this.state.sourceArr} /></Col>
                    <Col><Widgetpie title="Users comparision" data={this.state.usersArr} /></Col>
                    
                    </Row>
                </Container>
                </div>
                );
    }
}
export default dashboard;