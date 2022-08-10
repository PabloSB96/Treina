package com.developm8.treina.trainer.clientdetail

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.widget.Toolbar
import androidx.fragment.app.Fragment
import androidx.fragment.app.FragmentManager
import com.developm8.treina.R
import com.google.android.material.bottomnavigation.BottomNavigationView

class TrainerClientDetailActivity : AppCompatActivity() {

    var fm: FragmentManager = supportFragmentManager
    private var statsFragment: Fragment = FragmentTrainerClientDetailStats()
    private var exercicesFragment: Fragment = FragmentTrainerClientDetailExercices()
    private var dietFragment: Fragment = FragmentTrainerClientDetailDiet()
    private var activeFragment: Fragment = statsFragment

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_trainer_client_detail)

        title = getString(R.string.client_details_title)

        var toolbar: Toolbar = findViewById(R.id.toolbar)
        setSupportActionBar(toolbar)

        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        fm.beginTransaction().add(R.id.trainer_client_detail_fragment_container, dietFragment, "diet").hide(dietFragment).commit()
        fm.beginTransaction().add(R.id.trainer_client_detail_fragment_container, exercicesFragment, "exercices").hide(exercicesFragment).commit()
        fm.beginTransaction().add(R.id.trainer_client_detail_fragment_container, statsFragment, "stats").commit()

        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener {
            when(it.itemId) {
                R.id.navigation_trainer_client_detail_stats -> {
                    fm.beginTransaction().hide(activeFragment).show(statsFragment).commit()
                    activeFragment = statsFragment
                    true
                }
                R.id.navigation_trainer_client_detail_exercices -> {
                    fm.beginTransaction().hide(activeFragment).show(exercicesFragment).commit()
                    activeFragment = exercicesFragment
                    true
                }
                R.id.navigation_trainer_client_detail_diet -> {
                    fm.beginTransaction().hide(activeFragment).show(dietFragment).commit()
                    activeFragment = dietFragment
                    true
                }
                else -> false
            }
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        onBackPressed()
        finish()
        return true
    }
}