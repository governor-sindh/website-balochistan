"use client"
import { Authenticator } from '@aws-amplify/ui-react'
import React from 'react'
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsConfig from '@/config/config';

const AdminPage = () => {
    // Amplify.configure(awsConfig);
    return (
        <div></div>
        // <div className='mt-16'>
        //     <Authenticator loginMechanisms={["email", "username"]} hideSignUp>
        //         {({ signOut, user }) => (
        //             <main>
        //                 <h1>Hello {user?.username}</h1>
        //                 <button onClick={signOut}>Sign out</button>
        //             </main>
        //         )}
        //     </Authenticator>

        // </div>
    )
}

export default AdminPage