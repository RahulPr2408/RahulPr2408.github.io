import { toast } from 'react-toastify';
import { auth, db, storage } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Cloudinary unsigned upload helper
export const uploadToCloudinary = async (file) => {
  const url = 'https://api.cloudinary.com/v1_1/dll4ianbx/upload'; // <-- replace with your cloud name
  const preset = 'restaurant_images'; // <-- replace with your unsigned preset
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);
  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = await res.json();
  if (!data.secure_url) throw new Error('Cloudinary upload failed');
  return data.secure_url;
};

// AUTH
export const signUp = async (email, password, name) => {
  // Create user in Firebase
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

export const signIn = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem('userName');
};

// RESTAURANT PROFILE
export const updateRestaurantProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const docRef = doc(db, 'restaurants', user.uid);
  let updates = { ...profileData };

  // Handle logo image
  if (profileData.logoImage instanceof File) {
    updates.logoImage = await uploadToCloudinary(profileData.logoImage);
  }
  // Handle map image
  if (profileData.mapImage instanceof File) {
    updates.mapImage = await uploadToCloudinary(profileData.mapImage);
  }
  await setDoc(docRef, updates, { merge: true });
  return updates;
};

export const getRestaurantProfile = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const docRef = doc(db, 'restaurants', user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

// RESTAURANT STATUS
export const updateRestaurantStatus = async (statusData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const docRef = doc(db, 'restaurants', user.uid);
  await updateDoc(docRef, statusData);
  return statusData;
};

// MENU ITEMS
export const getMenuItems = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const menuRef = collection(db, 'restaurants', user.uid, 'menuItems');
  const querySnapshot = await getDocs(menuRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addMenuItem = async (menuItem) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  let item = { ...menuItem };
  if (menuItem.image instanceof File) {
    item.image = await uploadToCloudinary(menuItem.image);
  }
  const menuRef = collection(db, 'restaurants', user.uid, 'menuItems');
  const docRef = await addDoc(menuRef, item);
  return { id: docRef.id, ...item };
};

export const updateMenuItem = async (id, menuItem) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  let updates = { ...menuItem };
  if (menuItem.image instanceof File) {
    updates.image = await uploadToCloudinary(menuItem.image);
  }
  const itemRef = doc(db, 'restaurants', user.uid, 'menuItems', id);
  await updateDoc(itemRef, updates);
  return updates;
};

export const deleteMenuItem = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const itemRef = doc(db, 'restaurants', user.uid, 'menuItems', id);
  await deleteDoc(itemRef);
  return id;
};

// COMBO MENU
export const getComboMenuItems = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  
  // Fetch combos
  const comboRef = collection(db, 'restaurants', user.uid, 'combos');
  const comboSnapshot = await getDocs(comboRef);
  const combos = comboSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch proteins
  const proteinRef = collection(db, 'restaurants', user.uid, 'proteinOptions');
  const proteinSnapshot = await getDocs(proteinRef);
  const proteins = proteinSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Fetch sides
  const sideRef = collection(db, 'restaurants', user.uid, 'sideOptions');
  const sideSnapshot = await getDocs(sideRef);
  const sides = sideSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { combos, proteins, sides };
};

export const addCombo = async (comboData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  let combo = { ...comboData };
  if (comboData.image instanceof File) {
    combo.image = await uploadToCloudinary(comboData.image);
  }
  const comboRef = collection(db, 'restaurants', user.uid, 'combos');
  const docRef = await addDoc(comboRef, combo);
  return { id: docRef.id, ...combo };
};

export const updateCombo = async (id, comboData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  let updates = { ...comboData };
  if (comboData.image instanceof File) {
    updates.image = await uploadToCloudinary(comboData.image);
  }
  const comboRef = doc(db, 'restaurants', user.uid, 'combos', id);
  await updateDoc(comboRef, updates);
  return updates;
};

export const deleteCombo = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const comboRef = doc(db, 'restaurants', user.uid, 'combos', id);
  await deleteDoc(comboRef);
  return id;
};

// PROTEIN/SIDE OPTIONS (example for protein)
export const addProteinOption = async (proteinData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const proteinRef = collection(db, 'restaurants', user.uid, 'proteinOptions');
  const docRef = await addDoc(proteinRef, proteinData);
  return { id: docRef.id, ...proteinData };
};

export const deleteProteinOption = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const proteinRef = doc(db, 'restaurants', user.uid, 'proteinOptions', id);
  await deleteDoc(proteinRef);
  return id;
};

export const addSideOption = async (sideData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const sideRef = collection(db, 'restaurants', user.uid, 'sideOptions');
  const docRef = await addDoc(sideRef, sideData);
  return { id: docRef.id, ...sideData };
};

export const deleteSideOption = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const sideRef = doc(db, 'restaurants', user.uid, 'sideOptions', id);
  await deleteDoc(sideRef);
  return id;
};