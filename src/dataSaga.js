import { call, put, takeEvery } from 'redux-saga/effects';
// import { addtask, removetask, edittask } from './taskSlice';
import {fetchDataStart, fetchDataSuccess, fetchDataError ,addDataError,editDataError,deleteDataError,addData,editData,deleteData } from './dataSlice';


import axios from 'axios';

function* fetchData() {
  try {
    const response = yield call(axios.get, 'https://interns-test.onrender.com/api/tasks');
    // console.log(response);
    yield put(fetchDataSuccess(response.data));
  } catch (error) {
    yield put(fetchDataError(error.message));
  }
}
function* addDatasaga(action) {
  try {

   yield call(axios.post, 'https://interns-test.onrender.com/api/tasks',action.payload);
    // console.log(response);
  } catch (error) {
    yield put(addDataError(error.message));
  }
}

function* editDatasaga(action) {
  try {
     yield call(axios.patch, `https://interns-test.onrender.com/api/tasks/${action.payload._id}`,action.payload);
    // console.log(response);
  } catch (error) {
    yield put(editDataError(error.message));
  }
}
function* deleteDatasaga(action) {
  try {
    console.log(action.payload);
     yield call(axios.delete, `https://interns-test.onrender.com/api/tasks/${action.payload._id}`);
    // console.log(response);
  } catch (error) {
    yield put(deleteDataError(error.message));
  }
}



export default function* dataSaga() {
  yield takeEvery(fetchDataStart.type, fetchData);
  yield takeEvery(addData.type, addDatasaga);
  yield takeEvery(editData.type, editDatasaga);
  yield takeEvery(deleteData.type, deleteDatasaga);

}