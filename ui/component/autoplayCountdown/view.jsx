// @flow
import React from 'react';
import Button from 'component/button';

type Props = {};

export default function AutoplayCountdown(props: Props) {
  return (
    <div className="autoplay__wrapper">
      <div>Up Next</div>
      <div>"Iran Must Begin Acting Like a Normal Nation"</div>
      <div>Spinner</div>
      <Button label={__('Cancel')} button="link" />
    </div>
  );
}
