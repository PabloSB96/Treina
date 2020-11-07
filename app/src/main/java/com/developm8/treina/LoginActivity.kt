package com.developm8.treina

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import com.google.android.material.switchmaterial.SwitchMaterial
import com.google.android.material.textfield.TextInputLayout
import com.google.android.material.textview.MaterialTextView

class LoginActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        val kindPerson : MaterialTextView = findViewById(R.id.materialTextViewKindPerson)
        val switchKindPerson : SwitchMaterial = findViewById(R.id.switchMaterialKindPerson)
        val textInputLayoutTrainerCode : TextInputLayout = findViewById(R.id.textInputLayoutTrainerCode)

        switchKindPerson.setOnClickListener {
            if (switchKindPerson.isChecked) {
                kindPerson.setText(R.string.kindPersonTrainer)
                textInputLayoutTrainerCode.visibility = View.GONE
            } else {
                kindPerson.setText(R.string.kindPersonClient)
                textInputLayoutTrainerCode.visibility = View.VISIBLE
            }
        }
    }
}
