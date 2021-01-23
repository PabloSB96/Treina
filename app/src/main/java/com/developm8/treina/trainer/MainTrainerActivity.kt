package com.developm8.treina.trainer

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.developm8.treina.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainTrainerActivity : AppCompatActivity() {

    var fm : FragmentManager = supportFragmentManager
    var clientsFragment: Fragment = FragmentMainTrainerClients()
    var myExercicesFragment: Fragment = FragmentMainTrainerMyExercices()
    var profileFragment: Fragment = FragmentMainTrainerProfile()
    var activeFragment: Fragment = clientsFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_trainer)

        title = getString(R.string.app_name)

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        fm.beginTransaction().add(R.id.main_fragment_container, profileFragment, "profile").hide(profileFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, myExercicesFragment, "myexercices").hide(myExercicesFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, clientsFragment, "clients").commit()

        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.navigation_main_trainer_clients -> {
                    fm.beginTransaction().hide(activeFragment).show(clientsFragment).commit()
                    activeFragment = clientsFragment
                    true
                }
                R.id.navigation_main_trainer_myexercices -> {
                    fm.beginTransaction().hide(activeFragment).show(myExercicesFragment).commit()
                    activeFragment = myExercicesFragment
                    true
                }
                R.id.navigation_main_trainer_profile -> {
                    fm.beginTransaction().hide(activeFragment).show(profileFragment).commit()
                    activeFragment = profileFragment
                    true
                }
                else -> false
            }
        }
    }
}
