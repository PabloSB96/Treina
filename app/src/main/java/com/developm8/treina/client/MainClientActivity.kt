package com.developm8.treina.client

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.developm8.treina.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class MainClientActivity : AppCompatActivity() {

    var fm : FragmentManager = supportFragmentManager
    var exercicesFragment : Fragment = FragmentMainClientExercices()
    var dietFragment : Fragment = FragmentMainClientDiet()
    var chatFragment : Fragment = FragmentMainClientChat()
    var statsFragment: Fragment = FragmentMainClientStats()
    var profileFragment : Fragment = FragmentMainClientProfile()
    var activeFragment : Fragment = exercicesFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main_client)

        title = getString(R.string.app_name)

        val toolbar : Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        fm.beginTransaction().add(R.id.main_fragment_container, profileFragment, "profile").hide(profileFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, chatFragment, "chat").hide(chatFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, dietFragment, "diet").hide(dietFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, statsFragment, "stats").hide(statsFragment).commit()
        fm.beginTransaction().add(R.id.main_fragment_container, exercicesFragment, "exercices").commit()

        val bottomNavigationView : BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.navigation_main_client_exercices -> {
                    fm.beginTransaction().hide(activeFragment).show(exercicesFragment).commit()
                    activeFragment = exercicesFragment
                    true
                }
                R.id.navigation_main_client_diet -> {
                    fm.beginTransaction().hide(activeFragment).show(dietFragment).commit()
                    activeFragment = dietFragment
                    true
                }
                R.id.navigation_main_client_chat -> {
                    fm.beginTransaction().hide(activeFragment).show(chatFragment).commit()
                    activeFragment = chatFragment
                    true
                }
                R.id.navigation_main_client_stats -> {
                    fm.beginTransaction().hide(activeFragment).show(statsFragment).commit()
                    activeFragment = statsFragment
                    true
                }
                R.id.navigation_main_client_profile -> {
                    fm.beginTransaction().hide(activeFragment).show(profileFragment).commit()
                    activeFragment = profileFragment
                    true
                }
                else -> false
            }
        }
    }
}
