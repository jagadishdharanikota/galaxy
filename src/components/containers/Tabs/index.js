import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
    };
  }

  handleTabClick = (event) => {
    const { target } = event;
    const { activeTabIndex } = this.state;
    let index;
    const li = target.closest('li');
    index = li.getAttribute('data-index');
    index = parseInt(index, 10);
    if (activeTabIndex !== index) {
      this.setState({ activeTabIndex: index });
    }
  };

  createTabs(tabs) {
    const { activeTabIndex } = this.state;
    return tabs.map((tab, index) => (
      <li
        key={tab.title}
        className={`nav-item ${activeTabIndex === index ? 'active' : ''}`}
        data-index={index}
        role="tab"
        onClick={this.handleTabClick}
        onKeyDown={this.handleTabClick}
      >
        <a className="nav-link" data-toggle="tab" href={`#${tab.title}`}>
          {tab.title}
        </a>
      </li>
    ));
  }

  createTabContent(tabs) {
    const { activeTabIndex } = this.state;
    return tabs.map((tab, index) => (
      <div
        key={tab.title}
        id={`${tab.title.split(' ').join('_')}`}
        className={`tab-pane fade ${activeTabIndex === index ? 'show active' : ''}`}
      >
        {tab.component}
      </div>
    ));
  }

  render() {
    const { tabs } = this.props;
    return (
      <>
        <ul className="nav nav-tabs">{this.createTabs(tabs)}</ul>
        <div className="tab-content">{this.createTabContent(tabs)}</div>
      </>
    );
  }
}

Tabs.propTypes = {
  tabs: PropTypes.instanceOf(Array).isRequired,
};

export default Tabs;
