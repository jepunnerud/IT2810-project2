'use client';

import styles from 'src/app/login/register/RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import {
  Button,
  Card,
  Container,
  Input,
  Loading,
  Spacer,
  Text,
} from '@nextui-org/react';
import useRegister from '@/app/(hooks)/useRegister';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
  const router = useRouter();
  const [PBerror, setPBerror] = useState();
  const { registerUser, isLoading } = useRegister();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  function onSubmit(data) {
    setPBerror();
    registerUser(data).then((e) => {
      if (e) {
        setPBerror(e);
        console.log(e);
      } else {
        reset();
        router.push('/');
      }
    });
  }
  return (
    <Container
      style={{
        margin: 'auto',
        minWidth: '350px',
        maxWidth: '500px',
        padding: '30px',
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <Card.Body
            className={styles.registerForm}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              padding: '25px',
            }}
          >
            <Text h2 style={{ margin: '0rem' }}>
              Create a new account
            </Text>
            <Input
              clearable
              bordered
              id="username"
              label="Username"
              type={'text'}
              helperText={
                (PBerror?.username && PBerror.username.message) ||
                errors.username?.message
              }
              helperColor={'error'}
              {...register('username', {
                required: 'Username is required.',
                maxLength: {
                  value: 20,
                  message: 'Username cannot be longer than 20 characters.',
                },
              })}
            />
            <Input
              clearable
              bordered
              id="name"
              label="Full Name"
              type={'text'}
              helperText={
                (PBerror?.name && PBerror.name.message) || errors.name?.message
              }
              helperColor={'error'}
              {...register('name', {
                required: 'Full Name is required.',
                maxLength: {
                  value: 100,
                  message: 'Full Name cannot be longer than 100 characters.',
                },
              })}
            />
            <Input
              clearable
              bordered
              labelLeft="+47"
              id="telephone_number"
              label="Phone Number"
              type={'tel'}
              helperText={
                (PBerror?.telephone_number &&
                  PBerror.telephone_number.message) ||
                errors.telephone_number?.message
              }
              helperColor={'error'}
              {...register('telephone_number', {
                required: 'Phone Number is required.',
                maxLength: {
                  value: 10,
                  message: 'Not a valid phone number.',
                },
              })}
            />
            <Input
              clearable
              bordered
              id="email"
              label="Email"
              type={'email'}
              helperText={
                (PBerror?.email && PBerror.email.message) ||
                errors.email?.message
              }
              helperColor={'error'}
              {...register('email', {
                required: 'Email Address is required.',
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: 'Not a valid email.',
                },
              })}
            />
            <Input.Password
              bordered
              id="outlined-password-input"
              label="Password"
              type="password"
              helperText={
                (PBerror?.password && PBerror.password.message) ||
                errors.password?.message
              }
              helperColor={'error'}
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 8,
                  message: 'Password needs to be longer than 8 characters.',
                },
              })}
            />
            <Input.Password
              bordered
              id="outlined-password-input"
              label="Confirm password"
              type="password"
              helperText={
                (PBerror?.passwordConfirm && PBerror.passwordConfirm.message) ||
                errors.passwordConfirm?.message
              }
              helperColor={'error'}
              {...register('passwordConfirm', {
                required: 'You must confirm the password.',
                validate: {
                  passwordMatch: (value) =>
                    getValues().password === value ||
                    "Passwords doesn't match.",
                },
              })}
            />
            <Spacer y={0.1} />
            <Button disabled={isLoading} type="submit" color="success">
              {isLoading ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                'Register'
              )}
            </Button>
          </Card.Body>
        </Card>
      </form>
    </Container>
  );
}