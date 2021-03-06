import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import SwapTabWrapper from './swaptabwrapper';
import View from '../view';
import Text, { InfoText } from '../text';
import Input from '../input';
import DropDown from '../dropdown';
import { decimals } from '../../utils';
import { MdCompareArrows } from 'react-icons/md';
import Controls from '../controls';

const MobileSwapTabContent = ({
  classes,
  feeAmount,
  minAmount,
  maxAmount,
  rates,
  parseRate,
  inputError,
  baseAmount,
  base,
  currencies,
  quote,
  quoteAmount,
  error,
  errorMessage,
  disabled,
  switchPair,
  updateQuoteAmount,
  updateBaseAmount,
  updatePair,
  shouldSubmit,
}) => (
  <View className={classes.wrapper}>
    <View className={classes.info}>
      <InfoText title="Min amount" text={`${minAmount}`} />
      <InfoText title="Max amount" text={`${maxAmount}`} />
      <InfoText title="Fee" text={`${feeAmount}`} />
      <InfoText title="Rate" text={`${parseRate(rates)}`} />
    </View>
    <View className={classes.inputs}>
      <View className={classes.select}>
        <Text text="You send" className={classes.selectTitle} />
        <View className={classes.selectInput}>
          <Input
            disable={disabled}
            className={classes.inputMobile}
            min={minAmount}
            max={maxAmount}
            step={0.001}
            error={inputError}
            value={baseAmount}
            onChange={e => updateQuoteAmount(e)}
          />
          <DropDown
            className={classes.inputMobile}
            defaultValue={base}
            fields={currencies}
            onChange={e => updatePair(quote, e)}
          />
        </View>
      </View>
      <MdCompareArrows
        className={classes.arrows}
        onClick={() => switchPair()}
      />
      <View className={classes.select}>
        <Text text="You receive" className={classes.selectTitle} />
        <View className={classes.selectInput}>
          <Input
            disable={disabled}
            className={classes.inputMobile}
            min={1 / decimals}
            max={Number.MAX_SAFE_INTEGER}
            step={1 / decimals}
            error={inputError}
            value={quoteAmount}
            onChange={e => updateBaseAmount(e)}
          />
          <DropDown
            className={classes.inputMobile}
            defaultValue={quote}
            fields={currencies}
            onChange={e => updatePair(e, base)}
          />
        </View>
      </View>
    </View>
    <View className={classes.next}>
      <Controls
        mobile={true}
        text={'Start swap'}
        error={error || inputError}
        onPress={error ? () => {} : () => shouldSubmit()}
        errorText={inputError ? 'Invalid amount' : errorMessage}
      />
    </View>
  </View>
);

const styles = theme => ({
  wrapper: {
    flex: '1 0 content',
    flexDirection: 'column',
    backgroundColor: theme.colors.white,
  },
  info: {
    flex: '1 1 content',
    justifyContent: 'space-between',
    padding: '10px',
    flexWrap: 'wrap',
  },
  inputs: {
    flex: '1 1 content',
    flexDirection: 'column',
  },
  inputMobile: {
    '@media (max-width: 370px)': {
      width: '130px',
    },
    width: '180px',
    borderRadius: '3px',
    fontSize: '16px',
  },
  selectTitle: {
    fontSize: '24px',
  },
  select: {
    margin: '20px 0px 20px 0px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectInput: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  next: {
    backgroundColor: theme.colors.matisseBlue,
  },
  arrows: {
    height: '30px',
    width: '30px',
    alignSelf: 'center',
    cursor: 'pointer',
    transform: 'rotate(90deg)',
    transition: 'none 200ms ease-out',
    transitionProperty: 'color',
    color: theme.colors.tundoraGrey,
    '&:hover': {
      color: theme.colors.hoverGrey,
    },
  },
});

MobileSwapTabContent.propTypes = {
  classes: PropTypes.object,
  onPress: PropTypes.func,
  fees: PropTypes.object.isRequired,
  rates: PropTypes.object.isRequired,
  limits: PropTypes.object.isRequired,
  currencies: PropTypes.array.isRequired,
  quote: PropTypes.string,
  quoteAmount: PropTypes.number,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  feeAmount: PropTypes.number,
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  inputError: PropTypes.bool,
  baseAmount: PropTypes.string,
  base: PropTypes.string,
  disabled: PropTypes.bool,
  parseRate: PropTypes.func,
  switchPair: PropTypes.func,
  updateQuoteAmount: PropTypes.func,
  updateBaseAmount: PropTypes.func,
  updatePair: PropTypes.func,
  shouldSubmit: PropTypes.func,
};

const MobileSwapTab = props => (
  <SwapTabWrapper {...props}>
    {p => <MobileSwapTabContent {...p} />}
  </SwapTabWrapper>
);

export default injectSheet(styles)(MobileSwapTab);
