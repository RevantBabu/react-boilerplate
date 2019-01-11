/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
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
  makeSelectSearchusername, makeSelectNewusername, makeSelectUsers, makeSelectSearchError,
  makeSelectAddStatus, makeSelectAddTried, makeSelectAddError
} from './selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { changeSearchusername, changeNewusername, searchUsername, addUsername } from './actions';
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
export class HomePage extends React.PureComponent {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    /*if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }*/
  }

  render() {
    const { addStatus, addTried, addError, searchError, users } = this.props;
    /*const reposListProps = {
      loading,
      error,
      repos,
    };*/

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Sentiment analysis homepage" />
        </Helmet>
        <div>
          <CenteredSection>
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
            <p>
              <FormattedMessage {...messages.startProjectMessage} />
            </p>
          </CenteredSection>
          <Section>
            <H2>
              <FormattedMessage {...messages.trymeHeader} />
            </H2>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="existingUserId"
                  value={this.props.searchusername}
                  onChange={this.props.onSearchUsername}
                />
              </label>
            </Form>
            {/*<ReposList {...users} />*/}
            <div>
              {this.props.users.map((item, index) => (
                <li key={index}>
                    <a href={`/user/${item.name}`}>{item.name}</a>
                </li>
              ))}
            </div>
          </Section>

          <Section>
            <H2>
              <FormattedMessage id="Create new Profile" />
            </H2>
            <Form onSubmit={this.props.onSubmitNewUsername}>
              <label htmlFor="newprofile">
                <FormattedMessage id="select userId for profile and enter to submit" />
                <AtPrefix>
                  <FormattedMessage id="@" />
                </AtPrefix>
                <Input
                  id="profile"
                  type="text"
                  placeholder="newUserId"
                  value={this.props.newusername}
                  onChange={this.props.onAddUsername}
                />
              </label>
            </Form>
            <div>
            {
              this.props.addTried &&
              (this.props.addStatus  && 
                <p>user created. access: <a href={`/user/${this.props.newusername}`}>{this.props.newusername}</a></p>)
            }
            {
              this.props.addTried &&
              (!addStatus && <p>user already exists.Try different id</p>)
            }
            </div>
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  addStatus: PropTypes.bool,
  addTried: PropTypes.bool,
  addError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  searchError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  onSubmitNewUsername: PropTypes.func,
  searchusername: PropTypes.string,
  newusername: PropTypes.string,
  onSearchUsername: PropTypes.func,
  onAddUsername: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSearchUsername: evt => dispatch(changeSearchusername(evt.target.value)),
    onAddUsername: evt => dispatch(changeNewusername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(searchUsername());
    },
    onSubmitNewUsername: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addUsername());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  searchusername: makeSelectSearchusername(),
  newusername: makeSelectNewusername(),
  users: makeSelectUsers(),
  searchError: makeSelectError(),
  addStatus: makeSelectAddStatus(),
  addTried: makeSelectAddTried(),
  addError: makeSelectAddError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
