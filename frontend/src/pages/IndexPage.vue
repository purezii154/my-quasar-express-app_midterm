<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">Full-Stack Docker Demo</div>

    <q-card class="my-card bg-grey-2">
      <q-card-section>
        <div class="text-h6">Status from Backend API</div>
        <div v-if="loading" class="text-center q-pa-md">
          <q-spinner color="primary" size="2em" />
        </div>
        <div v-else-if="error" class="text-negative">
          {{ error }}
        </div>
        <div v-else>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ apiData.git.title }}</q-item-label>
                <q-item-label caption>{{ apiData.git.detail }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ apiData.docker.title }}</q-item-label>
                <q-item-label caption>{{ apiData.docker.detail }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Refresh Data" color="primary" @click="fetchData" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiData = ref({ git: {}, docker: {} })
const loading = ref(false)
const error = ref(null)

// ดึง URL จาก Env
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    // เรียก API
    const response = await axios.get(`${apiUrl}/api/demo`)
    apiData.value = response.data
  } catch (err) {
    console.error('API Error:', err)
    error.value = 'ไม่สามารถเชื่อมต่อ Backend ได้'
  } finally {
    loading.value = false
  }
}

onMounted(fetchData)
</script>