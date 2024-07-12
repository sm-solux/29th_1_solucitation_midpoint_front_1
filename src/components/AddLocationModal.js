import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { myPageStyles } from '../styles/myPageStyles';

Modal.setAppElement('#root');

const AddLocationModal = ({ isOpen, closeModal, editLocation, selectedLocation }) => {
  const [locateName, setLocateName] = useState('');
  const [locateAddress, setLocateAddress] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      setLocateName(selectedLocation.name);
      setLocateAddress(selectedLocation.locate);
      setIsEditing(false);
      setIsAdded(selectedLocation.locate.trim() !== '');
    } else {
      setLocateName('');
      setLocateAddress('');
      setIsAdded(false);
    }
  }, [selectedLocation]);

  const clearInputs = () => {
    setLocateName('');
    setLocateAddress('');
  };

  const handleAddLocation = () => {
    const updatedLocation = {
      ...selectedLocation,
      locate: locateAddress
    };
    editLocation(updatedLocation);
    setIsAdded(true);
    setIsEditing(false);
    clearInputs();
    closeModal();
  };

  const handleEditLocation = () => {
    const editedLocation = {
      ...selectedLocation,
      name: locateName,
      locate: locateAddress,
    };
    editLocation(editedLocation);
    setIsEditing(false);
    clearInputs();
    closeModal();
  };

  const handleDeleteLocation = () => {
    const updatedLocation = {
      ...selectedLocation,
      locate: ''
    };
    editLocation(updatedLocation);
    clearInputs();
    setIsAdded(false);
    setIsEditing(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{ overlay: myPageStyles.overlay, content: myPageStyles.modal }}
      contentLabel="AddEditLocationModal"
    >
      <div style={myPageStyles.modalContent}>
        <img src={`/img/${selectedLocation ? selectedLocation.icon : 'homeIcon'}.png`} style={myPageStyles.addImg} alt="addLocation" />
        <h3>{selectedLocation ? selectedLocation.name : '장소 추가'}</h3>
        <input
          type="text"
          value={locateAddress || ''}
          style={{
            ...myPageStyles.inputLocate,
            backgroundColor: isEditing || !isAdded ? '#fff' : '#fff',
            color: isEditing || !isAdded ? '#1B4345': '#1B4345',
          }}
          disabled={isAdded && !isEditing}
          onChange={(e) => setLocateAddress(e.target.value)}
          placeholder="등록할 장소 또는 주소 입력"
        />
        {!isAdded ? (
          <button onClick={handleAddLocation} style={myPageStyles.addFriendModalButton}>추가</button>
        ) : (
          selectedLocation && (
            <div>
              {isEditing ? (
                <>
                  <button onClick={handleEditLocation} style={myPageStyles.favoriteButtonEdit}>저장</button>
                  <button onClick={() => setIsEditing(false)} style={myPageStyles.favoriteButtonQuit}>취소</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsEditing(true)} style={myPageStyles.favoriteButtonEdit}>편집</button>
                  <button onClick={handleDeleteLocation} style={myPageStyles.favoriteButtonQuit}>삭제</button>
                </>
              )}
            </div>
          )
        )}
        <button onClick={closeModal} style={myPageStyles.closeButton}>X</button>
      </div>
    </Modal>
  );
};

export default AddLocationModal;
