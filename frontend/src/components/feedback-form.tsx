import React, { ChangeEvent, useState } from 'react';
import { 
  Button, 
  ButtonGroup, 
  Box, 
  MenuItem,
  Modal, 
  Typography, 
  Select,
  SelectChangeEvent
} from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import apiRequest from '../utils/http-req';

const BoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#23395d',
  color: 'white',
  border: '2px solid',
  boxShadow: 24,
  p: 2
};

const ButtonGroupStyle = {
  display: 'flex',
  justifyContent: 'center',
  '& .MuiButton-root': {
    border: 0,
    margin: '10px'
  },
}

const EmojiButtonStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  '&:hover': {
    backgroundColor: '#04AF70'
  },
}

const SelectStyle = {
  margin: '0.5em',
  width : '75%',
  color : 'white',
  textAlign : 'center',
  '& .MuiSelect-root': {
    backgroundColor: 'white'
  }
}

const SubmitButtonStyle = {
  margin: '0.5em',
  width : '75%'
}

const emojiList: EmojiInfo = {
  '🙁' : 'Terrible',
  '🫤' : 'Okay',
  '🤩' : 'Awesome'
};

const terribleReasons = [
  'None',
  'I feel very boring',
  'I dun understand all of the parts',
  'I could not do any of the activities'
];

const okayReasons = [
  'None',
  'I felt bored a few times',
  'I can only understand some parts',
  'I can only do some of the activities'
];

const awesomeReasons = [
  'None',
  'I dun feel bored at all',
  'I can understand all the parts',
  'I can do alot of the activities'
];

const FeedbackForm: React.FC<FeedbackFormProps> = ({open = false, email = ''}) => {
  const [defaultReasons, setDefaultReasons] = useState<string[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedReason, setSelectedReason] = useState('None');
  const [otherReason, setOtherReason] = useState('None');

  const reasonsMap: { [key: string]: string[] } = {
    Awesome: awesomeReasons,
    Okay: okayReasons,
    Terrible: terribleReasons,
  };

  const handleEmojiClick = (emojiType: string) => {
    setSelectedEmoji(emojiType);
    setSelectedReason('');
    setDefaultReasons(reasonsMap[emojiType] || []);
  };

  const handleReasonSelect = (event: SelectChangeEvent) => {
    setSelectedReason(event.target.value as string);
  };

  const handleOtherReason = (event: ChangeEvent<HTMLTextAreaElement>) : void => {
    setOtherReason(event.target.value as string);
  }

  const submitFeedback = () => {
    if (selectedEmoji && selectedReason) {
      let data = {
        'email' : email,
        'emoji' : selectedEmoji,
        'reason' : selectedReason,
        'otherReason' : otherReason
      };

      apiRequest('feedback', data, 'POST').then((result: any) => {
        alert("Thanks for filling the feedback form!");
      }).catch((err: any) => {
        console.log(err);
      });
    } else {
      alert("Please fill in the information");
    }
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BoxStyle}>
        <Typography id="modal-modal-title" align="center" variant="h6" component="h2">
          How was your class today?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Your honest answer will help to improve your class in the future
        </Typography>
        <ButtonGroup sx={ButtonGroupStyle}>
          {Object.keys(emojiList).map((emojiIcon) => (
            <Button 
              sx={{
                ...EmojiButtonStyle,
                backgroundColor: selectedEmoji === emojiList[emojiIcon] ? '#04AF70' : 'initial'
              }} 
              key={emojiIcon} 
              onClick={() => handleEmojiClick(emojiList[emojiIcon])}
              aria-selected={selectedEmoji === emojiList[emojiIcon]}
            >
              <h1>{emojiIcon}</h1>
              <Typography>{emojiList[emojiIcon]}</Typography>
            </Button>
          ))}
        </ButtonGroup>
        <Box textAlign='center'>
          {selectedEmoji && (
            <div>
              <Typography>Can you tell us why?</Typography>
              <Select 
                id='reason-dropdown'
                data-testid='reason-dropdown'
                sx={SelectStyle}
                value={selectedReason}
                onChange={handleReasonSelect}
              >
                {defaultReasons.map((reasonOption, index) => (
                  <MenuItem key={index} value={reasonOption}>
                    {reasonOption}
                  </MenuItem>
                ))}
                <MenuItem value="other">
                  <em>Other</em>
                </MenuItem>
              </Select>
            </div>
          )}
          {selectedReason == "other" && (
            <TextareaAutosize 
              style={{ width: "75%" }}
              minRows={5} 
              placeholder="Please explain here" 
              onChange={handleOtherReason} 
            />
          )}
          {selectedReason && (
            <Button 
              sx={SubmitButtonStyle} 
              variant="contained" 
              color='success' 
              onClick={submitFeedback}
            >
              Submit
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default FeedbackForm;
