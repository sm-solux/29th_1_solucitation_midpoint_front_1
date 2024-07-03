export const writeModalStyles = {
  overlay: {
    backgroundColor: 'rgba(1, 1, 1, 0.5)',
  },
  modal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '670px',
    height:'600px',
    backgroundColor: '#F2F2EF',
    padding: "20px",
    border:'3px solid #1B4345',
    borderRadius: "5px",
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    zIndex: '1000',
  },
  closeButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#1B4345',
    position: 'absolute',
    fontSize: '30px',
    fontWeight: 'bold',
    top: '30px',
    right: '30px',
    zIndex: '1000',
  },
  profileContainer: {
    position: 'relative',
  },
  profileImg: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    verticalAlign: 'middle' 
  },
  profileName: {
    position: 'absolute',
    top: '50%',
    marginLeft:'140px',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
    fontWeight: 'bold'
  },
  inputName: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    outline: 'none',
    marginTop: '15px',
    marginBottom: '10px',
    backgroundColor: 'transparent',
    fontColor: '#1B4345',
    fontSize: '20px',
    fontWeight: 'bold',
    textDecoration:'underline',
    ':: placeholder': {
      color: '#000',
      textStyle: 'bold',
      textDecoration:'underline',
    },
  },
  textarea: {
    width: '100%',
    height: '75px',
    padding: '10px',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    resize: 'none',
    '::placeholder': {
      color: '#000', // 검은색으로 변경
      fontStyle: 'italic', // 원하는 폰트 스타일
      textDecoration: 'underline', // 밑줄 스타일
    },
  },
  imgContainer: {
  },
  addImg: {
    width: "200px",
    height: "200px",
    margin: "10px",
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '10px',
  },
  tagButton: {
    marginTop: '20px',
    padding: '5px 10px',
    border: '2px solid #000000',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  button: {
    color: '#FFFFFF',
    backgroundColor: '#1B4345',
    border: '2px none bold',
    borderRadius: "5px",
    position: 'absolute',
    fontSize: '15px',
    padding:'5px 15px',
    bottom: '30px',
    right: '40px',
  },
};
