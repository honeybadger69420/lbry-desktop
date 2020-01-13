import { connect } from 'react-redux';
import { makeSelectClaimForUri, doSearch, makeSelectRecommendedContentForUri, selectIsSearching } from 'lbry-redux';
import RecommendedVideos from './view';

const select = (state, props) => ({});

const perform = (dispatch, ownProps) => ({});

export default connect(
  select,
  perform
)(RecommendedVideos);
