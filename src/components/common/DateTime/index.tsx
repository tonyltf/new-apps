import React, { ReactElement } from 'react';

interface DatetimeProps {
  text: string | '';
}

const DateTime = (props: DatetimeProps): ReactElement => {
  try {
    const { text } = props;
    const date = new Date(text).toLocaleString(); // enhancement: using moment to format the date string
    return <span className="datetime">{date}</span>;
  } catch (e) {
    console.error('Invalid date');
    return <span />;
  }
};

export default DateTime;
