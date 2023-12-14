package com.example.auth

import android.hardware.biometrics.BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE
import android.hardware.biometrics.BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED
import android.hardware.biometrics.BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE
import android.hardware.biometrics.BiometricManager.BIOMETRIC_SUCCESS
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat

class MainActivity : AppCompatActivity() {
    private lateinit var biometricPrompt: BiometricPrompt
    private lateinit var promptInfo: BiometricPrompt.PromptInfo

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        checkBiometricSupport()
    }

    private fun checkBiometricSupport() {
        val biometricManager = BiometricManager.from(this)

        when (biometricManager.canAuthenticate(BiometricManager.Authenticators.BIOMETRIC_WEAK)) {
            BIOMETRIC_SUCCESS -> {
                // El dispositivo es compatible con la autenticación biométrica
                showBiometricPrompt()
            }
            BIOMETRIC_ERROR_NO_HARDWARE -> {
                // El dispositivo no tiene hardware de autenticación biométrica
                showToast("No hay hardware biométrico disponible en este dispositivo.")
            }
            BIOMETRIC_ERROR_HW_UNAVAILABLE -> {
                // El hardware de autenticación biométrica no está disponible actualmente
                showToast("El hardware biométrico no está disponible en este momento.")
            }
            BIOMETRIC_ERROR_NONE_ENROLLED -> {
                // No se han registrado datos biométricos en el dispositivo
                showToast("No se han registrado datos biométricos en este dispositivo.")
            }
        }
    }

    private fun showBiometricPrompt() {
        val executor = ContextCompat.getMainExecutor(this)
        biometricPrompt = BiometricPrompt(this, executor, object : BiometricPrompt.AuthenticationCallback() {
            override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                super.onAuthenticationError(errorCode, errString)
                showToast("Authentication error: $errString")
            }

            override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                super.onAuthenticationSucceeded(result)
                showToast("Authentication succeeded!")
            }

            override fun onAuthenticationFailed() {
                super.onAuthenticationFailed()
                showToast("Authentication failed")
            }
        })

        promptInfo = BiometricPrompt.PromptInfo.Builder()
            .setTitle("Biometric Authentication")
            .setSubtitle("Log in using your biometric credential")
            .setNegativeButtonText("Cancel")
            .build()

        findViewById<View>(R.id.authenticateButton).setOnClickListener {
            biometricPrompt.authenticate(promptInfo)
        }
    }

    private fun showToast(message: String) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show()
    }
}