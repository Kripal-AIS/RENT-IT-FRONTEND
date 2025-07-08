import React from 'react'
import { useState } from 'react'
import ChatPopup from './ChatPopup';
import ChatIcon from '@mui/icons-material/Chat';

export default function Chat() {
  const [modelShow, setModeShow] = useState(false);

  return (

    <div className='chat'>
      {true && <ChatPopup />}
      <button className="chatBubble" onClick={() => setModeShow(!modelShow)}>
        <ChatIcon sx={{ fontSize: 30 }} />
      </button>
    </div>
  )
}
