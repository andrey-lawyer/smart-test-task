<script setup lang="ts">
import { ref ,type  PropType } from 'vue'

import { useUsersApi } from '@/hooks/useUserApi'

import type { IDataSubmit } from '@/types/IDataSubmit'
import type { TypeForm } from '@/types/typeForm'
import type { IUser } from '@/types/IUserApi'

const props = defineProps({
  type: {
    type: String as () => TypeForm,
    required: false,
    default: 'add'
  },
  userId: {
    type: [Number, String],
    required: false
  },
  user: {
    type: Object as PropType<IUser>,
    required: false
  },
  updateUserLocally: {
    type: Function,
    required: false
  },
  addUserLocally: {
    type: Function,
    required: false
  },
  closeModal: {
    type: Function as PropType<() => void>,
    required: true
  }
})

const { fetchUpdateUsers, fetchAddUsers, responseUpdate, responseAdd, loading } = useUsersApi()

const isUpdate = props.type === 'update' ? true : false

const emailUi = ref(isUpdate ? props.user?.email : '')
const nameUi = ref(isUpdate ? props.user?.first_name : '')
const surnameUi = ref(isUpdate ? props.user?.last_name : '')

const phoneUi = ref(isUpdate ? props.user?.phone || '' : '')
const addressUi = ref(isUpdate ? props.user?.address || '' : '')

const submitHandler = async (data: IDataSubmit) => {
  if (props.type === 'add') {
    await fetchAddUsers(data)
    if (responseAdd.value) {
      props.addUserLocally!(data)
      props.closeModal.bind(this)()
    }
  } else {
    await fetchUpdateUsers(props.userId!, data)
    if (responseUpdate.value) {
      props.updateUserLocally!(props.userId!, data)
      props.closeModal.bind(this)()
      phoneUi.value = ''
      addressUi.value = ''
    }
  }
  emailUi.value = ''
  nameUi.value = ''
  surnameUi.value = ''
}
</script>

<template>
  <FormKit
    type="form"
    :id="props.type === 'add' ? 'add' : 'update'"
    @submit="submitHandler"
    :actions="false"
    incomplete-message="Sorry, not all fields are filled in correctly."
    :name="'add-key'"
    :use-local-storage="props.type === 'add'"
  >
    <h1 class="title">
      {{ props.type === 'add' ? 'Add a user' : 'Update user information' }}
    </h1>
    <FormKit
      type="text"
      name="first_name"
      label="Name"
      placeholder="John"
      validation="required"
      :validation-messages="{
        required: `Name is required`
      }"
      v-model="nameUi"
    />
    <FormKit
      type="text"
      name="last_name"
      label="Surname"
      placeholder="Smith"
      validation="required"
      :validation-messages="{
        required: `Surname is required`
      }"
      v-model="surnameUi"
    />
    <FormKit
      type="email"
      name="email"
      label="Email"
      placeholder="jane@example.com"
      validation="required|email"
      :validation-messages="{
        required: 'Email is required',
        email: 'Enter a valid email address'
      }"
      v-model="emailUi"
    />
    <template v-if="props.type === 'update'">
      <FormKit
        type="text"
        name="phone"
        label="Phone"
        placeholder="123-456-7890"
        v-model="phoneUi"
      />
      <FormKit
        type="text"
        name="address"
        label="Address"
        placeholder="123 Main St"
        v-model="addressUi"
      />
    </template>
    <FormKit
      type="submit"
      :label="props.type === 'add' ? 'Add' : 'Update'"
      :classes="{
        input: {
          'button-form': true
        }
      }"
    />
    <div v-if="loading" class="loading">
      <div class="loader"></div>
    </div>
  </FormKit>
</template>

<style>
.formkit-form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 32px;
  margin: 0 auto;
  max-width: 456px;

  font-size: 14px;
  font-style: normal;

  line-height: 1;
  letter-spacing: 0.28px;
}
.title {
  text-align: center;
}
.formkit-label {
  font-size: 14px;
  margin-bottom: 2px;
}
.formkit-input {
  margin-top: 5px;
  align-items: center;
  background: #fff;
  border: 1px solid var(--border-input-color);
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 2px rgba(40, 46, 51, 0.2);
  box-shadow: inset 0 1px 2px rgba(40, 46, 51, 0.2);
  color: var(--color-font);
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  height: 44px;
  padding: 12px 16px;
}

.formkit-input:focus {
  outline: none;
  border: 1px solid var(--border-input-color-focus);
}

.formkit-input[aria-describedby],
.formkit-input[aria-describedby] {
  border: 1px solid var(--error-color);
}

.formkit-messages {
  position: absolute;
  bottom: -20px;
  color: var(--error-color);
}

.button-form {
  display: block;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  height: auto;
  line-height: 33px;
  padding-bottom: 5px;
  padding-top: 5px;
  -webkit-transition: 0s;
  transition: 0s;
  background-color: var(--button-color);
  color: var(--white-color);
  border: 1px solid var(--button-color);
  max-width: 100%;
  outline: none;
  text-align: center;
  -webkit-transition: background-color 0.1s linear;
  transition: background-color 0.1s linear;
}

.button-form:hover,
.button-form:focus {
  background-color: var(--button-hover-color);
}
.formkit-outer {
  position: relative;
}

.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50% -50%);
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #3498db;
  border-radius: 50%;
  border-top: 4px solid #fff;
  animation: spin 1s linear infinite;
}
</style>
