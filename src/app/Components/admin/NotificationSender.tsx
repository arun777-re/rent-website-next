'use client';

import React, { useCallback, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { sendNotification } from '@/redux/slices/adminSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const initialVal = {
  title: '',
  message: '',
  type: 'info',
};

const notificationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  message: yup.string().required('Message is required'),
  type: yup.string().oneOf(['info', 'success', 'warning', 'error']).required('Type is required'),
});

const NotificationSender = () => {
  const [feedback, setFeedback] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = useCallback(async (values: any, { resetForm }: any) => {
    try {
      dispatch(sendNotification(values));
      resetForm();
    } catch (error) {
      console.error(error);
      setFeedback('Something went wrong.');
    }
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Notification</h2>
      <Formik
        initialValues={initialVal}
        validationSchema={notificationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, errors, handleBlur, handleChange, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className="w-full p-2 border rounded"
              />
              {touched.title && errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                placeholder="Enter message"
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
                className="w-full p-2 border rounded"
              />
              {touched.message && errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                name="type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
                className="w-full p-2 border rounded"
              >
                <option value="">Select type</option>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
              {touched.type && errors.type && (
                <p className="text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Send Notification
            </button>

            {feedback && <p className="text-center text-sm text-gray-600 mt-2">{feedback}</p>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationSender;
