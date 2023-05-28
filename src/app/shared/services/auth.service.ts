import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user.model';
import { auth } from 'src/app/fbconfig';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { Store } from '@ngrx/store';
import { appSettingsActions } from 'src/app/redux/actions/app.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData!: User;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public store: Store,
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = JSON.parse(localStorage.getItem('user')!);
      this.store.dispatch(
        appSettingsActions.setUserName({ userName: user.displayName })
      );
    } catch (error) {
      console.log(error);
    }
  }

  async signUp(name: string, email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser!, { displayName: name });
      this.store.dispatch(appSettingsActions.setUserName({ userName: name }));
    } catch (error) {
      console.log(error);
    }
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  // ???
  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  async signOut() {
    await signOut(auth);
    localStorage.removeItem('user');
    this.router.navigate(['main']);
  }

  // ???
  async monitorAuthState() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // show login state & hide login error
      } else {
        // show login form
      }
    });
  }
}
