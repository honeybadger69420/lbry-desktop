// @flow
import * as PAGES from 'constants/pages';
import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const SettingsPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-SettingsPage" */
    'page/settings'
  )
);

const HelpPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-HelpPage" */
    'page/help'
  )
);

const ReportPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ReportPage" */
    'page/report'
  )
);

const ShowPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ShowPage" */
    'page/show'
  )
);

const PublishPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-PublishPage" */
    'page/publish'
  )
);

const DiscoverPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-DiscoverPage" */
    'page/discover'
  )
);

const RewardsPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-RewardsPage" */
    'page/rewards'
  )
);

const FileListDownloaded = loadable(() =>
  import(
    /* webpackChunkName: "chunk-FileListDownloaded" */
    'page/fileListDownloaded'
  )
);

const FileListPublished = loadable(() =>
  import(
    /* webpackChunkName: "chunk-FileListPublished" */
    'page/fileListPublished'
  )
);

const TransactionHistoryPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-TransactionHistoryPage" */
    'page/transactionHistory'
  )
);

const InvitePage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-InvitePage" */
    'page/invite'
  )
);

const SearchPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-SearchPage" */

    'page/search'
  )
);

const LibraryPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-LibraryPage" */
    'page/library'
  )
);

const WalletPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-WalletPage" */
    'page/wallet'
  )
);

const TagsPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-TagsPage" */
    'page/tags'
  )
);

const TagsFollowingPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-TagsFollowingPage" */
    'page/tagsFollowing'
  )
);

const ChannelsFollowingPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ChannelsFollowingPage" */
    'page/channelsFollowing'
  )
);

const ChannelsFollowingManagePage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ChannelsFollowingManagePage" */
    'page/channelsFollowingManage'
  )
);

const TagsFollowingManagePage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-TagsFollowingManagePage" */
    'page/tagsFollowingManage'
  )
);

const ListBlockedPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ListBlockedPage" */
    'page/listBlocked'
  )
);

const FourOhFourPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-FourOhFourPage" */

    'page/fourOhFour'
  )
);
const SignInPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-SignInPage" */

    'page/signIn'
  )
);
const SignInVerifyPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-SignInVerifyPage" */

    'page/signInVerify'
  )
);
const ChannelsPage = loadable(() =>
  import(
    /* webpackChunkName: "chunk-ChannelsPage" */

    'page/channels'
  )
);

const Loading = () => <div>Loading</div>;
// import HomePage from 'page/home';

// Tell the browser we are handling scroll restoration
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

type PrivateRouteProps = {
  component: any,
  isAuthenticated: boolean,
  location: { pathname: string },
};

function PrivateRoute(props: PrivateRouteProps) {
  const { component: Component, isAuthenticated, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated || !IS_WEB ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/$/${PAGES.AUTH}?redirect=${props.location.pathname}`} />
        )
      }
    />
  );
}

type Props = {
  currentScroll: number,
  location: { pathname: string, search: string },
  isAuthenticated: boolean,
};

function AppRouter(props: Props) {
  const {
    currentScroll,
    location: { pathname },
    isAuthenticated,
  } = props;

  React.useEffect(() => {
    window.scrollTo(0, currentScroll);
  }, [currentScroll, pathname]);

  return (
    <Switch>
      <Route path={`/`} exact component={ChannelsFollowingPage} />
      <Route path={`/$/${PAGES.DISCOVER}`} exact component={DiscoverPage} />
      <Route path={`/$/${PAGES.AUTH}`} exact component={SignInPage} />
      <Route path={`/$/${PAGES.TAGS}`} exact component={TagsPage} />
      <Route path={`/$/${PAGES.TAGS_FOLLOWING}`} exact component={TagsFollowingPage} />
      <Route
        path={`/$/${PAGES.CHANNELS_FOLLOWING}`}
        exact
        component={isAuthenticated ? ChannelsFollowingPage : DiscoverPage}
      />
      <Route path={`/$/${PAGES.CHANNELS_FOLLOWING_MANAGE}`} exact component={ChannelsFollowingManagePage} />
      <Route path={`/$/${PAGES.HELP}`} exact component={HelpPage} />
      <Route path={`/$/${PAGES.AUTH_VERIFY}`} exact component={SignInVerifyPage} />
      <Route path={`/$/${PAGES.SEARCH}`} exact component={SearchPage} />
      <Route path={`/$/${PAGES.SETTINGS}`} exact component={SettingsPage} />

      <PrivateRoute {...props} path={`/$/${PAGES.INVITE}`} component={InvitePage} />
      <PrivateRoute {...props} path={`/$/${PAGES.DOWNLOADED}`} component={FileListDownloaded} />
      <PrivateRoute {...props} path={`/$/${PAGES.PUBLISHED}`} component={FileListPublished} />
      <PrivateRoute {...props} path={`/$/${PAGES.PUBLISH}`} component={PublishPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.REPORT}`} component={ReportPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.REWARDS}`} component={RewardsPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.TRANSACTIONS}`} component={TransactionHistoryPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.LIBRARY}`} component={LibraryPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.TAGS_FOLLOWING_MANAGE}`} component={TagsFollowingManagePage} />
      <PrivateRoute {...props} path={`/$/${PAGES.BLOCKED}`} component={ListBlockedPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.WALLET}`} exact component={WalletPage} />
      <PrivateRoute {...props} path={`/$/${PAGES.CHANNELS}`} component={ChannelsPage} />

      {/* Below need to go at the end to make sure we don't match any of our pages first */}
      <Route path="/:claimName" exact component={ShowPage} />
      <Route path="/:claimName/:streamName" exact component={ShowPage} />
      <Route path="/*" component={FourOhFourPage} />
    </Switch>
  );
}

export default withRouter(AppRouter);
