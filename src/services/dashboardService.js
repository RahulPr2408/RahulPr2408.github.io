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

// AUTH
export const signUp = async (email, password, name) => {
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

export const logout = () => signOut(auth);

// RESTAURANT PROFILE
export const updateRestaurantProfile = async (profileData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  const docRef = doc(db, 'restaurants', user.uid);
  let updates = { ...profileData };

  // Handle logo image
  if (profileData.logoImage instanceof File) {
    const logoRef = ref(storage, `restaurants/${user.uid}/logo_${Date.now()}.${profileData.logoImage.name.split('.').pop()}`);
    await uploadBytes(logoRef, profileData.logoImage);
    updates.logoImage = await getDownloadURL(logoRef);
  }
  // Handle map image
  if (profileData.mapImage instanceof File) {
    const mapRef = ref(storage, `restaurants/${user.uid}/map_${Date.now()}.${profileData.mapImage.name.split('.').pop()}`);
    await uploadBytes(mapRef, profileData.mapImage);
    updates.mapImage = await getDownloadURL(mapRef);
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
    const imgRef = ref(storage, `restaurants/${user.uid}/menu_${Date.now()}.${menuItem.image.name.split('.').pop()}`);
    await uploadBytes(imgRef, menuItem.image);
    item.image = await getDownloadURL(imgRef);
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
    const imgRef = ref(storage, `restaurants/${user.uid}/menu_${Date.now()}.${menuItem.image.name.split('.').pop()}`);
    await uploadBytes(imgRef, menuItem.image);
    updates.image = await getDownloadURL(imgRef);
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
  const comboRef = collection(db, 'restaurants', user.uid, 'combos');
  const querySnapshot = await getDocs(comboRef);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addCombo = async (comboData) => {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');
  let combo = { ...comboData };
  if (comboData.image instanceof File) {
    const imgRef = ref(storage, `restaurants/${user.uid}/combo_${Date.now()}.${comboData.image.name.split('.').pop()}`);
    await uploadBytes(imgRef, comboData.image);
    combo.image = await getDownloadURL(imgRef);
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
    const imgRef = ref(storage, `restaurants/${user.uid}/combo_${Date.now()}.${comboData.image.name.split('.').pop()}`);
    await uploadBytes(imgRef, comboData.image);
    updates.image = await getDownloadURL(imgRef);
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