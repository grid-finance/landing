import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.scss';
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  TextField,
} from '@mui/material';
import logo from './assets/logo.png';
import discord from './assets/discord.svg';
import twitter from './assets/twitter.svg';
import gridPattern from './assets/grid_pattern.svg';
import gridPatternMobile from './assets/grid_pattern_mobile.svg';
import circlePattern from './assets/circular_pattern.svg';
import circlePatternMobile from './assets/circular_pattern_mobile.svg';
import { validate } from 'email-validator';

const twitterLink = 'https://twitter.com/gridfinanceHQ';
const discordLink = 'https://discord.gg/zVUjCU5kRw';

const addEmailToWaitlist = async (email: string) => {
  try {
    const res = await fetch('https://api.thegrid.finance/v1/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error('Request failed');
  }
};

function App() {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
    setError('');
  };

  const submit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (value) {
      if (validate(value)) {
        try {
          setLoading(true);
          const data = await addEmailToWaitlist(value);
          if (data.email) {
            setOpen(true);
            setValue(data.email);
          } else {
            setError(data.message);
          }
        } catch (err) {
          setError('Request failed. Please contact site admin');
        } finally {
          setLoading(false);
        }
      } else {
        setError('Email format is incorrect');
      }
    } else {
      setError('Email is required');
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderApp = () => (
    <div className="app">
      <div className="container">
        <img src={gridPattern} alt="grid pattern" className="grid-pattern" />
        <img src={logo} alt="logo" className="logo" />
        <div className="heading">
          End-to-end operations for web3 organizations and contributors
        </div>
        <div className="subheading">
          Do everything in a single application <br />
          No need to switch context, profiles or applications
        </div>
        <form className="form-container">
          <div className="input-container">
            <TextField
              variant="outlined"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={value}
              onChange={onChange}
              className="input"
              required
            />
            {loading && <CircularProgress size={28} className="input-loader" />}
            <Button
              type="submit"
              onClick={submit}
              id="button"
              disabled={loading}
            >
              Join our Waiting List
            </Button>
            {error !== '' && <div className="error-text">{error}</div>}
          </div>
        </form>
        <div className="social-container">
          <a
            rel="noreferrer"
            href={twitterLink}
            target="_blank"
            className="social"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            rel="noreferrer"
            href={discordLink}
            target="_blank"
            className="social"
          >
            <img src={discord} alt="discord" />
          </a>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog"
        >
          <img src={circlePattern} alt="pattern" className="dialog-pattern" />
          <DialogTitle id="alert-dialog-title" className="dialog-title">
            Congratulations!
            <br /> You are one of us :)
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="dialog-subtitle"
            >
              Welcome to the revolution. You are part of the change we wish to
              bring to the web3 ecosystem, thereby driving the change as we
              launch into a new age for orgs in web3.
            </DialogContentText>
            <DialogContentText className="dialog-text">
              registered with {value}
            </DialogContentText>
            <div className="modal-social-container">
              <a
                rel="noreferrer"
                href={twitterLink}
                target="_blank"
                className="social"
              >
                <img src={twitter} alt="twitter" />
              </a>
              <a
                rel="noreferrer"
                href={discordLink}
                target="_blank"
                className="social"
              >
                <img src={discord} alt="discord" />
              </a>
            </div>
            <div className="close-button" onClick={handleClose}>
              close
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );

  const renderMobileApp = () => (
    <div className="m-app">
      <div className="m-container">
        <img src={logo} alt="logo" className="m-logo" />
        <img
          src={gridPatternMobile}
          alt="grid pattern"
          className="m-grid-pattern"
          width={60}
        />
        <div className="m-heading">
          End-to-end operations for web3 organizations and contributors
        </div>
        <div className="m-subheading">
          Do everything in a single application <br />
          No need to switch context, profiles or applications
        </div>
        <form className="m-input-container">
          <TextField
            variant="outlined"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={value}
            onChange={onChange}
            className="m-input"
          />
          {loading && <CircularProgress size={28} className="m-input-loader" />}
          {error !== '' && <div className="m-error-text">{error}</div>}
          <Button
            type="submit"
            onClick={submit}
            id="m-button"
            disabled={loading}
          >
            Join our Waiting List
          </Button>
        </form>
        <div className="m-social-container">
          <a
            rel="noreferrer"
            href={twitterLink}
            target="_blank"
            className="m-social"
          >
            <img src={twitter} alt="twitter" />
          </a>
          <a
            rel="noreferrer"
            href={discordLink}
            target="_blank"
            className="m-social"
          >
            <img src={discord} alt="discord" />
          </a>
        </div>
        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          className="m-dialog"
        >
          <img
            src={circlePatternMobile}
            alt="pattern"
            className="m-dialog-pattern"
            width={window.screen.width}
          />
          <div className="m-dialog-content">
            <div className="m-dialog-title">
              Congratulations!
              <br /> You are one of us :)
            </div>
            <div className="m-dialog-subtitle">
              Welcome to the revolution. You are part of the change we wish to
              bring to the web3 ecosystem, thereby driving the change as we
              launch into a new age for orgs in web3.
            </div>
            <div className="m-dialog-text">registered with {value}</div>
            <div className="m-bottom-section">
              <div className="m-modal-social-container">
                <a
                  rel="noreferrer"
                  href={twitterLink}
                  target="_blank"
                  className="m-social"
                >
                  <img src={twitter} alt="twitter" />
                </a>
                <a
                  rel="noreferrer"
                  href={discordLink}
                  target="_blank"
                  className="m-social"
                >
                  <img src={discord} alt="discord" />
                </a>
              </div>
              <div className="m-close-button" onClick={handleClose}>
                close
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  );

  if (window.screen.width < 480) {
    return renderMobileApp();
  } else {
    return renderApp();
  }
}

export default App;
