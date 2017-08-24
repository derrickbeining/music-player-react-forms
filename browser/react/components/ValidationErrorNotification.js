import React from 'react';

export default function ValidationErrorNotification ({message}) {
  return (
    <div className="alert alert-warning">{message}</div>
  )
}
