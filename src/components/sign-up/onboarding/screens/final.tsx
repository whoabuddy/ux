import React from 'react';
import { useSelector } from 'react-redux';
import { Wallet } from '@blockstack/keychain';
import { Screen, ScreenBody, ScreenActions } from '@blockstack/connect';

import { AppState } from '../../../../store';
import { selectAppName } from '../../../../store/onboarding/selectors';
import { AppIcon } from '../../app-icon';

interface FinalProps {
  next: (wallet: Wallet) => void;
  back: () => void;
}

export const Final: React.FC<FinalProps> = props => {
  const appName = useSelector((state: AppState) => selectAppName(state));
  return (
    <Screen textAlign="center">
      <AppIcon />
      <ScreenBody
        title={`You’re all set! ${appName} has been connected to your Data Vault`}
        body={[`Everything you do in ${appName} will be private, secure, and only accessible with your Secret Key.`]}
      />
      <ScreenActions
        action={{
          label: 'Done',
          testAttr: 'button-connect-flow-finished',
          onClick: props.next,
        }}
      />
    </Screen>
  );
};
