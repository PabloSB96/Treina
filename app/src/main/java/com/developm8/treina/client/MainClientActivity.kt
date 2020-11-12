package com.developm8.treina.client

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.developm8.treina.FragmentMainChat
import com.developm8.treina.FragmentMainDiet
import com.developm8.treina.FragmentMainProfile
import com.developm8.treina.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainClientActivity : AppCompatActivity() {

    var fm : FragmentManager = supportFragmentManager
    var exercicesFragment : Fragment = FragmentMainClientExercices()
    var dietFragment : Fragment = FragmentMainDiet()
    var chatFragment : Fragment = FragmentMainChat()
    var profileFragment : Fragment = FragmentMainProfile()
    var activeFragment : Fragment = exercicesFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_client)

        title = "Treina"

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        fm.beginTransaction().add(R.id.main_fragment_container, profileFragment, "profile").hide(profileFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, chatFragment, "chat").hide(chatFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, dietFragment, "diet").hide(dietFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, exercicesFragment, "exercices").commit()

        val bottomNavigationView : BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.navigation_main_exercices -> {
                    fm.beginTransaction().hide(activeFragment).show(exercicesFragment).commit()
                    activeFragment = exercicesFragment
                    true
                }
                R.id.navigation_main_diet -> {
                    fm.beginTransaction().hide(activeFragment).show(dietFragment).commit()
                    activeFragment = dietFragment
                    true
                }
                R.id.navigation_main_chat -> {
                    fm.beginTransaction().hide(activeFragment).show(chatFragment).commit()
                    activeFragment = chatFragment
                    true
                }
                R.id.navigation_main_profile -> {
                    fm.beginTransaction().hide(activeFragment).show(profileFragment).commit()
                    activeFragment = profileFragment
                    true
                }
                else -> false
            }
        }
    }
}
