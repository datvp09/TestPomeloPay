import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {NavigationHeader, Toast} from '../components';
import {refundIcon, intenseBlue, isIpX} from '../Constants';
import moment from 'moment';

const mockupURL =
  'https://gist.githubusercontent.com/sverraest/7be1341f3a92391edf629c09c8749d15/raw/ee87f5c1722b9b11198a35cba5fd9d068135adf4/gistfile1.txt';
const REFUNDED_MSG = 'REFUNDED';
const CONFIRMED_MSG = 'CONFIRMED';
const QRCODEGENERATED_MSG = 'QR_CODE_GENERATED';

const Home = ({transactions}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefundAlertShow, setRefundVisible] = useState(false);

  useEffect(() => {
    onRefresh();
  }, []);

  const showRefundAlert = () => setRefundVisible(true);

  const hideRefundAlert = () => setRefundVisible(false);

  const onRefundAllConfirmed = () => {
    const refundedTransactions = transactions.map(x => ({
      ...x,
      state: 'REFUNDED',
    }));
    setTransactions(refundedTransactions);
    hideRefundAlert();
  };

  const renderRightView = () => (
    <TouchableOpacity onPress={showRefundAlert} style={styles.refundAllButton}>
      <Image
        source={refundIcon}
        resizeMode={'contain'}
        style={styles.refundAllButtonImg}
      />
    </TouchableOpacity>
  );

  const renderItems = ({item, index}) => {
    const {
      amount,
      currency,
      created, // Date object
      expires, // Date object
      id,
      initiatorDetails: {contactEmail, contactName},
      state,
    } = item;
    let stateColor = 'green'; // CONFIRMED_MSG
    if (state == REFUNDED_MSG) {
      stateColor = 'red';
    } else if (state == QRCODEGENERATED_MSG) {
      stateColor = intenseBlue;
    }

    return (
      <View style={[styles.itemTitleRow, index == 0 && {marginTop: 10}]}>
        <Text style={styles.itemTitle}>{'#' + id}</Text>
        <View style={styles.labelWrap}>
          <Text style={styles.itemText}>
            {'Amount: ' + amount + ' ' + currency}
            <Text style={{color: stateColor, fontWeight: '600'}}>
              {'\t\t' + state}
            </Text>
          </Text>
          <Text style={styles.itemText}>{'Contact name: ' + contactName}</Text>
          <Text style={styles.itemText}>
            {'Contact email: ' + contactEmail}
          </Text>
          <Text style={styles.itemText}>
            {'Create date: ' + moment(created).format('DD-MM-YYYY')}
          </Text>
          <Text style={styles.itemText}>
            {'Expire date: ' + moment(expires).format('DD-MM-YYYY')}
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setIsLoading(true);
    axios(mockupURL)
      .then(res => {
        if (res?.status != 200) {
          Toast('Error fetching data');
          return;
        }
        const newData = [...transactions];
        res?.data?.items.forEach(x => {
          if (transactions.some(y => y.id == x.id)) {
            newData.push(x);
          }
        });
        setTransactions(newData);
      })
      .catch(e => {
        Toast('Error fetching data');
        setTransactions([]);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <View style={styles.screen}>
        <NavigationHeader
          style={{height: 60}}
          title={'All Transactions'}
          rightView={renderRightView}
        />
        <FlatList
          data={transactions}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItems}
          style={styles.list}
          refreshing={isLoading}
          onRefresh={onRefresh}
        />
        <Modal
          isVisible={isRefundAlertShow}
          animationIn="fadeIn"
          animationOut="fadeOut"
          backdropTransitionOutTiming={0}
          onBackButtonPress={hideRefundAlert}
          onBackdropPress={hideRefundAlert}>
          <View style={styles.alertContainer}>
            <Text style={styles.refundConfirmText}>
              {'Confirm refund all transactions'}
            </Text>
            <TouchableOpacity
              style={styles.refundConfirmButton}
              onPress={onRefundAllConfirmed}>
              <Text>{'OK'}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#d0d0d0',
  },
  list: {
    flex: 1,
    marginBottom: isIpX ? 40 : 10,
  },
  itemTitleRow: {
    marginVertical: 5,
    marginHorizontal: 7,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    marginBottom: 5,
  },
  alertContainer: {
    height: 100,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  refundAllButton: {
    marginRight: 15,
    paddingTop: 3,
    width: 40,
    height: 30,
    alignItems: 'center',
  },
  refundAllButtonImg: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  refundConfirmText: {
    flex: 1,
    marginTop: 15,
    textAlign: 'center',
  },
  refundConfirmButton: {
    width: '100%',
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    borderRadius: 4,
    backgroundColor: 'white',
  },
});

const mapStateToProps = state => ({
  transactions: state.transaction.transactions,
});

const mapDispatchToProps = dispatch => {
  const {setTransactions} = require('../../redux/actions');

  return {
    setTransactions: data => dispatch(setTransactions(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
