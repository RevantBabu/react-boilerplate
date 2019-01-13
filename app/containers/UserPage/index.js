/*
 * Userpage
 *
 * at the '/users' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectUsername, makeSelectUserStats, makeSelectUserStatsError, 
  makeSelectAddSentimentStatus, makeSelectAddSentimentError, makeSelectAddSentimentTried
} from './selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import CenteredSection from 'containers/HomePage/CenteredSection';
import Section from 'containers/HomePage/Section';
import { getUserStats, addSentiment } from './actions';
import reducer from './reducer';
import saga from './saga';  

import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import { loadRepos } from '../App/actions';
import { addNewProfile } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class UserPage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    /*if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }*/
    this.props.onInitialLoad(this.props.match.params.userId);
  }

  render() {
    const { addSentimentStatus, addSentimentTried, addSentimentError } = this.props;
    /*const reposListProps = {
      loading,
      error,
      repos,
    };*/

    const buttonStylePlus = {
      backgroundColor: "#4CAF50 ",
      border: "none",
      color: "white",
      padding: "10px 10px",
      margin: "10px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      borderRadius: "8px"
    };

    const buttonStyleMinus = {
      backgroundColor: "#f44336 ",
      border: "none",
      color: "white",
      padding: "10px 10px",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      borderRadius: "8px"
    };

    return (
      <article>
        <Helmet>
          <title>User Page</title>
          <meta name="description" content="Sentiment analysis userpage" />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              {this.props.username}
            </H2>
          </CenteredSection>
          <CenteredSection>
            <div>
              {
                this.props.userStats && 
                <div>
                  <b>{"HISTORIC COUNT"}</b>
                  <b style={{"color": "#4CAF50", "margin": "10px"}}>{"+" + this.props.userStats.plus + "      "}</b>
                  <b style={{"color": "#f44336", "margin": "10px"}}>{"-" + this.props.userStats.minus}</b>
                </div>
              }
            </div>
            <b>
              {"ADD SENTIMENT"}
              <button style={buttonStylePlus} onClick={this.props.onClickSetimentPlus}>
              {" + "}
              </button>
              <button style={buttonStyleMinus} onClick={this.props.onClickSetimentMinus}>
              {" - "}
              </button>
            </b>
            <H2>
              {"TRENDS"}
            </H2>
            <div>
              {
                this.props.userStats && 
                <div>
                  <b>{"LAST DAY COUNT"}</b>
                  <b style={{"color": "#4CAF50", "margin": "10px"}}>{"+" + this.props.userStats.plusD + "      "}</b>
                  <b style={{"color": "#f44336", "margin": "10px"}}>{"-" + this.props.userStats.minusD}</b>
                </div>
              }
            </div>
            <p><b><a href={`/`}>Go Back To HomePage</a></b></p>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

UserPage.propTypes = {
  addSentimentStatus: PropTypes.bool,
  addSentimentTried: PropTypes.bool,
  addSentimentError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userStatsError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  username: PropTypes.string,
  userStats: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onClickSetimentPlus: PropTypes.func,
  onClickSetimentMinus: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
  return {
    onInitialLoad: user => dispatch(getUserStats(user)),
    onClickSetimentPlus: evt => dispatch(addSentiment(1)),
    onClickSetimentMinus: evt => dispatch(addSentiment(-1))
  };
}

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  userStats: makeSelectUserStats(),
  userStatsError: makeSelectUserStatsError(),
  addSentimentStatus: makeSelectAddSentimentStatus(),
  addSentimentError: makeSelectAddSentimentError(),
  addSentimentTried: makeSelectAddSentimentTried(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'user', reducer });
const withSaga = injectSaga({ key: 'user', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserPage);
