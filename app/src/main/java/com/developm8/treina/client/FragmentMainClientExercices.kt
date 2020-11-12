package com.developm8.treina.client

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.Exercice

class FragmentMainClientExercices : Fragment() {

    lateinit var recyclerView : RecyclerView
    lateinit var viewAdapter : RecyclerView.Adapter<*>
    lateinit var viewManager : RecyclerView.LayoutManager


    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_main_exercices, container, false);
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        viewManager = LinearLayoutManager(view.context)
        viewAdapter = MainClientExercicesAdapter(getData(), layoutInflater)
        recyclerView = view.findViewById<RecyclerView>(R.id.recyclerViewExercices).apply {
            setHasFixedSize(true)
            layoutManager = viewManager
            adapter = viewAdapter
        }
    }

    fun getData(): ArrayList<Exercice> {
        val result : ArrayList<Exercice> = ArrayList()
        result.add(Exercice("Hoy 08 de noviembre de 2020", "day"))
        result.add(Exercice("Pesas", "exercice"))
        result.add(Exercice("Mañana 09 de noviembre de 2020", "day"))
        result.add(Exercice("Mancuernas", "exercice"))
        result.add(Exercice("10 de noviembre de 2020", "day"))
        result.add(Exercice("Sentadillas", "exercice"))
        result.add(Exercice("11 de noviembre de 2020", "day"))
        result.add(Exercice("Pesas", "exercice"))
        result.add(Exercice("Sentadillas", "exercice"))
        result.add(Exercice("Correr 10 kms", "exercice"))
        return result
    }
}