import React, { useEffect, useState } from 'react';
import FeedbackForm from '../../components/feedback-form';

const LandingPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      if (emailParam) {
        setEmail(emailParam);

        const timer = setTimeout(() => {
            setOpen(true);
        }, 3000);

        return () => clearTimeout(timer);
      } else {

      }
    }, []);

    return (
        <div>
            Welcome <br/>
            Please Enter Your Email To The URL. For Example : http://localhost:3001/?email=guna3006@me.com.
            <FeedbackForm open={open} email={email} />
        </div>
    );
};

export default LandingPage;
