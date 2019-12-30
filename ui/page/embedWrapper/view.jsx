// @flow
import React, { useEffect } from 'react';
import FileRender from 'component/fileRender';

import Spinner from 'component/spinner';

type Props = {
  params: any,
};
const EmbedWrapperPage = (props: Props) => {
  const { resolveUri, claim, uri, streamUrl } = props;
  useEffect(() => {
    if (resolveUri && uri) {
      resolveUri(uri);
    }
  }, []);

  if (uri && claim) {
    return <FileRender uri={uri} embedUrl={streamUrl} />;
  } else {
    return <Spinner />;
  }
};

export default EmbedWrapperPage;
